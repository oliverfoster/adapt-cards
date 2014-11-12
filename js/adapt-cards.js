define(function(require) {
    var ComponentView = require('coreViews/componentView');
    var Adapt = require('coreJS/adapt');

    var Cards = ComponentView.extend({

    	events: {
    		"click .cards-trigger": "onTriggerPressed"
    	},

        postRender: function() {
            this.setReadyStatus();
            this.checkLayout();
            this.index = 0;
        },

        checkLayout: function() {
        	if (this.$el.width() >= this.model.get("_desktopConfig")._size._width) {
        		this.desktopLayout();
        	} else {
        	}
        },

        desktopLayout: function() {
        	this.setupCardPositions();
        },

        setupCardPositions: function() {
        	var $card = this.$(".card");
        	var cards = this.model.get("_cards");
        	$card.each(_.bind(function(index, item) {
        		var card = cards[index];
        		$(item).velocity({
        			left: card._initialPosition._left + "px",
        			top: card._initialPosition._top + "px",
        			scaleX: card._initialPosition.scale,
        			scaleY: card._initialPosition.scale,
        			rotateX: card._initialPosition.rotate.x + "deg",
        			rotateY: card._initialPosition.rotate.y + "deg",
        			rotateZ: card._initialPosition.rotate.z + "deg"
        		}, {
        			duration: 0
        		});
        		
        	}, this));
        	this.selectCardWithIndex(0);
        },

        setInitalCardPositionWithIndex: function(index) {
        	var cardData = this.model.get("_cards")[index];
        	var selectedPosition = {
        		left: this.model.get("_desktopConfig")._card._position._left,
        		top: this.model.get("_desktopConfig")._card._position._top
        	};
        	var card = this.$(".card")[index];
        	var cardInner = $(card).children(".card-inner");
        	
        	$(card).velocity({
    			left: cardData._initialPosition._left + "px",
    			top: cardData._initialPosition._top + "px",
    			scaleX: cardData._initialPosition.scale,
    			scaleY: cardData._initialPosition.scale,
    			rotateX: cardData._initialPosition.rotate.x + "deg",
    			rotateY: cardData._initialPosition.rotate.y + "deg",
    			rotateZ: cardData._initialPosition.rotate.z + "deg"
    		}, {
    			duration: 1400,
    			easing: [450, 50]
    		});
    		$(card).removeClass("card-selected");

    		$(cardInner).velocity({
    			opacity: 0
    		}, {
    			duration: 700
    		});
        },

        onTriggerPressed: function(event) {
        	if (event) event.preventDefault();
        	var cardsLength = this.model.get("_cards").length;
        	this.index++;
        	if (this.index < cardsLength) {
        		this.selectCardWithIndex(this.index);
        		this.setInitalCardPositionWithIndex(this.index - 1);
        	} else if (this.index == cardsLength) {
        		this.setCompletionStatus();
        		this.index = 0;
        		this.selectCardWithIndex(this.index);
        		this.setInitalCardPositionWithIndex(cardsLength - 1);
        	}
        },

        selectCardWithIndex: function(index) {
        	var cardData = this.model.get("_cards")[index];
        	var selectedPosition = {
        		left: this.model.get("_desktopConfig")._card._position._left,
        		top: this.model.get("_desktopConfig")._card._position._top
        	};
        	var card = this.$(".card")[index];
        	var cardInner = $(card).children(".card-inner");

        	$(card).velocity({
    			left: selectedPosition.left + "px",
    			top: selectedPosition.top + "px",
    			scaleX: 1,
    			scaleY: 1,
    			rotateX: 0,
    			rotateY: 0,
    			rotateZ: 0
    		}, {
    			duration: 1500,
    			easing: [450, 30]
    		});
    		$(card).addClass("card-selected");

    		$(cardInner).velocity({
    			opacity: 1
    		}, {
    			duration: 700
    		});
        }

    });

    Adapt.register("cards", Cards);

});