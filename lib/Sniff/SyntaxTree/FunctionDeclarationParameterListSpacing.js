/*
* @package jscodesniffer
* @author sheiko
* @license MIT
* @copyright (c) Dmitry Sheiko http://www.dsheiko.com
* jscs standard:Jquery
* jshint unused:false
* Code style: http://docs.jquery.com/JQuery_Core_Style_Guidelines
*/
/**
* A module representing a sniffer.
* @module lib/Sniff/SyntaxTree/FunctionDeclarationParameterListSpacing
*/
// UMD boilerplate according to https://github.com/umdjs/umd
if ( typeof module === "object" && typeof define !== "function" ) {
	/**
	* Override AMD `define` function for RequireJS
	* @param {function( function, Object, Object )} factory
	*/
	var define = function ( factory ) {
		module.exports = factory( require, exports, module );
	};
}
/**
	* @param {function( string )} require
	*/
define(function( require ) {
"use strict";

		/**
		* @type {utilsSniff/Utils}
		*/
var utils = require( "../Utils" ),
		/**
		* @constant
		* @type {String}
		* @default
		*/
		NAME = "FunctionDeclarationParameterListSpacing",
	/**
	* @constructor
	* @alias module:lib/Sniff/SyntaxTree/FunctionDeclarationParameterListSpacing
	* @param {module:lib/SourceCode} sourceCode
	* @param {module:lib/Mediator} mediator
	* @param {module:lib/TokenIterator} tokenIterator
	*/
	Sniff = function( sourceCode, mediator, tokenIterator ) {
		/**
		* @type {Mixin}
		*/
		var mixin = utils.Mixin( sourceCode, mediator, NAME );
		/** @lends module:lib/Sniff/SyntaxTree/FunctionDeclarationParameterListSpacing.prototype */
		return {
			/**
			* Check the contract
			* @access public
			* @param {Object} rule
			*/
			validateRule: function( rule ) {
				utils.validateRule( rule, "allowTrailingWhitespaces", "number", true );
				utils.validateRule( rule, "allowPrecedingWhitespaces", "number", true );
			},
			/**
				* Run the sniffer according a given rule if a given node type matches the case
				* @access public
				* @param {Object} rule
				* @param {Object} node
				*/
			run: function( rule, node ) {
				var tokenIt;

				// function a (){}
				if ( node.type === "FunctionDeclaration" ) {

					// The token associated to the identifier
					tokenIt = tokenIterator
						.findByLeftPos( node.id.range[ 0 ] );
					// Analyze space between the identifier and the next token
					// Debug: sourceCode.extract( node.id.range[ 1 ], tokenIt.get( 1 ).range[ 0 ] ).print();

					mixin.sniffExcerpt( node.id, tokenIt.get( 1 ),
						rule.allowPrecedingWhitespaces, "FunctionDeclarationParamListPrecedingSpacing", "<" );


					tokenIt = tokenIterator
						.findByLeftPos( node.body.range[ 0 ] );
					// Analyze space between the beginning of the block scope (body) and the prev token
					mixin.sniffExcerpt( tokenIt.get( -1 ), node.body,
						rule.allowTrailingWhitespaces, "FunctionDeclarationParamListTrailingSpacing", ">" );
				}
			}
		};
	};
	return Sniff;
});