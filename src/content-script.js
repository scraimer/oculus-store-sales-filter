'use strict';

var SECONDS_TO_WAIT_UNTIL_FILTER = 5;
var CLASSNAME_OF_CONTAINER = "section__items";

function find_ancestor_with_className(elem, className)
{
	var ancestor = elem.parentElement;
	while( ancestor && ancestor.className != className )
	{
		ancestor = ancestor.parentElement;
	}
	
	return ancestor;
}

function hide_purchased()
{
	var purchased_bylines = document.getElementsByClassName("store-section-item-byline__purchased");
	for( var i in purchased_bylines )
	{
		var sub_element = purchased_bylines[i];
		var cell = find_ancestor_with_className( sub_element, "section__items-cell" );
		if( !cell )
		{
			continue;
		}
		cell.parentElement.removeChild( cell );
	}
}

function get_section_oculus_id( section )
{
	if( !section )
	{
		return undefined;
	}
	var a_s = section.getElementsByTagName("a");
	if( !a_s || !a_s[0] )
	{
		return undefined;
	}
	var a_id = a_s[0].getAttribute("data-testid");
	return a_id;
}

function hide_items_from_list( list_of_oculus_store_ids )
{
	var sections = document.getElementsByClassName("store-section-item");
	for( var i=0; i < sections.length; ++i )
	{
		var section = sections[i];
		var oculus_id = parseInt( get_section_oculus_id( section ) );
		if( list_of_oculus_store_ids.indexOf( oculus_id ) != -1 )
		{
			var cell = find_ancestor_with_className( section, "section__items-cell" );
			if( !cell )
			{
				continue;
			}
			cell.parentElement.removeChild( cell );
		}
	}
}

function apply_filters()
{
	/*
	var dom_container = (function(){
		var containers = document.getElementsByClassName(CLASSNAME_OF_CONTAINER);
		return ( containers.length > 0 ) ?  containers[0] : null;
	})();

	if( dom_container == null )
	{
		return false;
	}
	
	console.log(dom_container);
	*/
	
	hide_purchased();
	
	var list = [
		1990542257627879, // Drops Rhythm Garden
		1766581036755768, // Mars is a real place
		2108572332534065,
		1257633284291446
	];
	hide_items_from_list( list );
	
	return true;
}

function apply_filters_proxy()
{
	var result = apply_filters();
	if( result )
	{
		console.log("Filter of Oculus Store items: filters applied successfully.");
	}
	else
	{
		console.log("Filter of Oculus Store items: filters were not applied.");
	}
}

function onload()
{
	console.log("Filter of Oculus Store items: loaded.");
	
	setTimeout(apply_filters_proxy, SECONDS_TO_WAIT_UNTIL_FILTER * 1000);
}

jQuery(document).ready(function() {
      onload();
});

