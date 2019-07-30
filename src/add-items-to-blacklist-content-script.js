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
	
	/*
	setTimeout(function(){ apply_filters(); init_mutation_observer(); }, SECONDS_TO_WAIT_UNTIL_FILTER * 1000);
	*/
}

jQuery(document).ready(function() {
      onload();
});

