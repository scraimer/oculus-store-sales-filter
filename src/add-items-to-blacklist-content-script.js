'use strict';

/*
function init_mutation_observer()
{
	var dom_container = (function(){
		var containers = document.getElementsByClassName(CLASSNAME_OF_CONTAINER);
		return ( containers.length > 0 ) ?  containers[0] : null;
	})();

	if( dom_container == null )
	{
		return false;
	}

	const mutationConfig = { attributes: false, childList: true, subtree: false, characterData: false,
    	characterDataOldValue: false};

	var onMutate = function(mutationsList) {
    	mutationsList.forEach(mutation => {
			if( mutation.type != "childList" )
			{
				return;
			}
			mutation.addedNodes.forEach(newNode => {
        		postpone_filtering_of_items();
			});
    	});
	};
	
	var observer = new MutationObserver(onMutate);
	observer.observe(dom_container, mutationConfig);	
}
*/

function isGameInBlacklist( gameId )
{
	// TODO: this is a stub
	return false;
}

function getGameId()
{
	var experienceRegex = RegExp('^https://www.oculus.com/experiences/rift/([0-9]+)/?$');
	var matches = document.URL.match(experienceRegex);
	if( !matches || matches.length < 2 )
	{
		return null;
	}
	
	return matches[1];
}

function addButton()
{
	var gameId = getGameId();
	if( !gameId )
	{
		console.log("Error finding Game ID");
		return;
	}

	var buttons = document.getElementsByClassName('app-wishlist-button');
	if( !buttons || buttons.length < 2 )
	{
		console.log("Error finding wishlist button");
		return;
	}

	var wishlistButton = buttons[1];
	var parentElement = wishlistButton.parentElement;
	var blacklistButton = wishlistButton.cloneNode(true);
	parentElement.appendChild( blacklistButton );

	var buttonAttrs = (function() {
		if( isGameInBlacklist( gameId ) )
		{
			return {
				//iconClassName: "wishlist-icon wishlist-icon__hover wishlist-icon__remove",
				iconClassName: "wishlist-icon wishlist-icon__remove",
				label: "Remove from Blacklist"
			};
		}
		else
		{
			return {
				iconClassName: "wishlist-icon wishlist-icon__add",
 				label: "Add to Blacklist"
			};
		}
	})();
	
	console.log(buttonAttrs);
	
	var iconElem = blacklistButton.childNodes[0].firstChild;
	var labelElem = blacklistButton.childNodes[1];
	
	iconElem.className = buttonAttrs.iconClassName;
	labelElem.innerText = buttonAttrs.label;
}

function isPageOfGame()
{
	var isExperienceRegex = RegExp('^https://www.oculus.com/experiences/rift/[0-9]+/?$');
   return isExperienceRegex.test(document.URL);
}

function onload()
{
	if( !isPageOfGame() )
	{
		console.log("Ignoring page, not a page for a game.");
		return;
	}
	console.log("Oculus Store content script for adding items to blacklist: loaded.");
	
	var delayToAddingButton = 3;
	setTimeout(function(){ addButton(); }, delayToAddingButton * 1000);
}

jQuery(document).ready(function() {
      onload();
});

