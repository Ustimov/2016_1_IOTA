define(function (require) {

    var OffScreenRenderer = require('./off_screen_renderer'),
        ScreenRenderer = require('./screen_renderer'),
        Camera = require('./camera'),
        Table = require('./table'),
        Hand = require('./hand'),
        CardResponse = require('./card_response'),
        user = require('models/session'),
        $ = require('jquery'),
        Score = require('./score');
    return function (gameModel) {
        var scoreWidth = 150;
        var score1 = new Score(10, 40, scoreWidth, 100, "", 0),
            score2 = new Score(10, 80, scoreWidth, 100, "", 0),
            score3 = new Score(10, 120, scoreWidth, 100, "", 0),
            score4 = new Score(10, 160, scoreWidth, 100, "", 0);

        var TABLE_SIZE = 6500;
        var offScreenCanvas = document.createElement('canvas'),
            screenCanvas = document.getElementById('canvas'),
            backgroundCanvas = document.createElement('canvas'),
            offScreenRenderer = new OffScreenRenderer(offScreenCanvas, backgroundCanvas, TABLE_SIZE, TABLE_SIZE);
        var prevPlayer = -1;
        var isGameOver = false;

        screenCanvas.width = $('#canvas').width();
        screenCanvas.height = $('#canvas').height();


        var table = new Table(65, 65, 100, 100),
            hand = new Hand(screenCanvas);

        hand.reSize();

        offScreenRenderer.addDrawable(table);
        offScreenRenderer.render();

        var screenRenderer = new ScreenRenderer(screenCanvas, new Camera(offScreenCanvas, backgroundCanvas, TABLE_SIZE / 2 - screenCanvas.width / 2, TABLE_SIZE / 2 - screenCanvas.height / 2, screenCanvas.width, screenCanvas.height), table, offScreenRenderer, hand);
        addScore(screenRenderer);

        window.onresize = function(e) {
            screenCanvas.width = $('#canvas').width();
            screenCanvas.height = $('#canvas').height();
            delete screenRenderer;
            screenRenderer = new ScreenRenderer(screenCanvas, new Camera(offScreenCanvas, backgroundCanvas, TABLE_SIZE / 2 - screenCanvas.width / 2, TABLE_SIZE / 2 - screenCanvas.height / 2, screenCanvas.width, screenCanvas.height), table, offScreenRenderer, hand);
            addScore(screenRenderer);
            hand.reSize();
            document.dispatchEvent(new CustomEvent('toRender'));
        };

        function addScore(screenRenderer) {
            screenRenderer.addDrawable(score1);
            screenRenderer.addDrawable(score2);
            screenRenderer.addDrawable(score3);
            screenRenderer.addDrawable(score4);
            screenRenderer.render();
        }

        screenRenderer.render();
        document.addEventListener('exit', function (event) {
            gameModel.clear({silent: true});
            gameModel.set('ephemeral', false, {silent: true});
            gameModel.set('endSequence', true, {silent: true});
            gameModel.set('goodbye', true, {silent: true});
            gameModel.set('__type', "PlayerPingMessage", {silent: true});
            isGameOver = true;
            gameModel.save([], {
                success: function (model, response, options) {
                    if (response.__ok) {
                        hand.clear();
                        table.clear();
                        $('#loader').show();
                        $('#canvas').hide();
                        $('#myModal').modal('hide');
                        window.location.href = "./#";
                    } else {
                        isGameOver = false;
                    }
                }
            });
        });
        document.addEventListener('debugConclude', function (event) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/game', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            var body = {};
            body.debugConclude = true;
            body.__type = "PlayerPingMessage";
            xhr.send(JSON.stringify(body));
        });
        document.addEventListener('over', function (event) {
            gameModel.clear({silent: true});
            gameModel.set('ephemeral', false, {silent: true});
            gameModel.set('endSequence', true, {silent: true});
            gameModel.set('goodbye', false, {silent: true});
            gameModel.set('__type', "PlayerPingMessage", {silent: true});
            gameModel.save([],{
                success: function(model, response, options) {
                }
            });
        });
        document.addEventListener('cardPass', function (event) {
            gameModel.clear({silent: true});
            gameModel.set('ephemeral', false, {silent: true});
            gameModel.set('endSequence', false, {silent: true});
            gameModel.set('goodbye', false, {silent: true});
            gameModel.set('__type', "PlayerPassCardMessage", {silent: true});
            gameModel.set('uuid', event.detail.uuid, {silent: true});
            gameModel.save([],{
                success: function(model, response, options) {
                    if(response.__ok) {
                        document.dispatchEvent(new CustomEvent('toRender'));
                        $('.js-pass').attr('disabled','');
                    }
                }
            });
        });
        document.addEventListener('cardPlaced', function (event) {
            gameModel.clear({silent: true});
            gameModel.set('ephemeral', false, {silent: true});
            gameModel.set('endSequence', false, {silent: true});
            gameModel.set('goodbye', false, {silent: true});
            gameModel.set('__type', "PlayerPlaceCardMessage", {silent: true});
            gameModel.set('uuid', event.detail.uuid, {silent: true});
            gameModel.set('offX', event.detail.x - 32, {silent: true});
            gameModel.set('offY', event.detail.y - 32, {silent: true});
            gameModel.save([],{
                success: function(model, response, options) {
                    if(!response.__ok) {
                        event.detail.card.setInHand(true);
                        event.detail.card.setHighlightColor("black");
                        document.dispatchEvent(new CustomEvent('toRender'));
                    } else {
                        $('.js-pass').attr('disabled','');
                    }
                }
            });
        });
        document.addEventListener('exitPrev', function (event) {
            if(!isGameOver) {
                $('#myModal').modal('show');
                $('.modal-header').text("Вы уверены?");
                $('.modal-body').find('.js-alert').text("В случае выхода, вы проиграете...");
            } else {
                document.dispatchEvent(new CustomEvent('exit'));
            }
        });
        gameModel.on('endGame', function() {
            if(isGameOver) return;
            $('#myModal').modal('show');
            $('.modal-header').text("Игра окончена!");
            $('.modal-body').find('.js-alert').text("");
            var gamers = [];
            var sortFun = function(a, b) {
                if(a.score > b.score) return -1;
                else return 1;
            };
            for(i = 0; i < gameModel.message.players.length; i++)
                gamers.push({name: gameModel.message.players[i].login, score: gameModel.message.players[i].score, isMe: (gameModel.message.players[i].ref == user.get("ref"))});
            gamers.sort(sortFun);
            console.log(gamers);
            $('.modal-body').find('.js-alert').text("");
            for(i = 1; i != gamers.length + 1; i++) {
                var text = "" + i + ". " + gamers[i-1].name + ": " + gamers[i-1].score;
                $('.modal-body').find('.js-gamer' + i).text(text);
                if(gamers[i-1].isMe) $('.modal-body').find('.js-gamer' + i).addClass("text__temporary");
                $('.modal-body').find('.js-gamer' + i).show();
            }
        });
        gameModel.on('mess', function () {
            if(gameModel.message.concluded) {return;} else isGameOver = false;
            $('#loader').hide();
            $('#canvas').show();
            hand.clear();
            var message = gameModel.message;
            gameModel.message = null;
            var isChangePlayer = (prevPlayer != message.ref);
            prevPlayer = message.ref;
            table.setStep(user.get('ref') == message.ref);
            if(table.getStep() && isChangePlayer)
                $('.js-pass').removeAttr('disabled');
            if(table.getStep()) $('.js-over').removeAttr('disabled');
            else $('.js-over').attr('disabled', '');
            var i = 0;
            var j = 0;
            var player = 1;

            if (message.players.length < 4) {
                score4.update("", 0);
            }

            if (message.players.length < 3) {
                score3.update("", 0);
            }

            for(j = 0; j < message.players.length; j++) {
                tempPlayer = message.players[j];
                var isTurnPlayer = (message.ref === tempPlayer.ref);
                var isCurrentPlayer = (user.get('ref') === tempPlayer.ref);

                switch (j) {
                    case 0:
                        score1.update(tempPlayer.login, tempPlayer.score, isTurnPlayer, isCurrentPlayer);
                        break;
                    case 1:
                        score2.update(tempPlayer.login, tempPlayer.score, isTurnPlayer, isCurrentPlayer);
                        break;
                    case 2:
                        score3.update(tempPlayer.login, tempPlayer.score, isTurnPlayer, isCurrentPlayer);
                        break;
                    case 3:
                        score4.update(tempPlayer.login, tempPlayer.score, isTurnPlayer, isCurrentPlayer);
                        break;
                }

                if(tempPlayer.ref == user.get('ref')) {
                    var cardHand = [];
                    for(i = 0; i < tempPlayer.hand.length; i++) {
                        cardPull = tempPlayer.hand[i];
                        //console.log(JSON.stringify(cardPull));
                        if(cardPull.concrete) {
                            cardPullNumber = "1";
                            switch (cardPull.number) {
                                case "ONE": cardPullNumber = "1"; break;
                                case "TWO": cardPullNumber = "2"; break;
                                case "THREE": cardPullNumber = "3"; break;
                                case "FOUR": cardPullNumber = "4"; break;
                            }
                            cardHand.push(new CardResponse(0, 0, cardPullNumber, cardPull.color[0].toLowerCase(), cardPull.shape[0].toLowerCase(), "", cardPull.uuid, cardPull.passed));
                        } else {
                            cardHand.push(new CardResponse(0, 0, "", "", "", "super", cardPull.uuid, cardPull.passed));
                        }
                    }
                    hand.update(cardHand);
                }
            }

            for(i = 0; i < message.field.length; i++) {
                cardPull = message.field[i];
                //console.log(JSON.stringify(cardPull));
                if(cardPull.item.concrete) {
                    cardPullNumber = "1";
                    switch (cardPull.item.number) {
                        case "ONE": cardPullNumber = "1"; break;
                        case "TWO": cardPullNumber = "2"; break;
                        case "THREE": cardPullNumber = "3"; break;
                        case "FOUR": cardPullNumber = "4"; break;
                    }
                    table.update([new CardResponse(32 + cardPull.offx, 32 + cardPull.offy, cardPullNumber, cardPull.item.color[0].toLowerCase(), cardPull.item.shape[0].toLowerCase(), "", cardPull.item.uuid, cardPull.item.passed)]);
                } else {
                    table.update([new CardResponse(32 + cardPull.offx, 32 + cardPull.offy, "", "", "", "super", cardPull.item.uuid, cardPull.item.passed)]);
                }
            }
        });
        document.addEventListener('toRender', function (event) {
            screenRenderer.clear();
            offScreenRenderer.render();
            screenRenderer.render();
        });
    };
});