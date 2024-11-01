/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IFilterOperator } from 'tiddlywiki';

const lingoBase = '$:/plugins/linonetwo/principles/language/';
function lingo(key: string) {
  const languageCode = $tw.wiki.filterTiddlers('[[$:/language]get[text]get[name]else[en-GB]]')[0];
  return $tw.wiki.getTiddlerText(`${lingoBase}${languageCode}/${key}`, key);
}

const principlesFilter: IFilterOperator = (source, operator) => {
  let rootTiddler = $tw.wiki.getTiddlerText('$:/plugins/linonetwo/principles/configs/RootTiddler');
  if (!rootTiddler) {
    rootTiddler = lingo('Name');
  }
  // we are getting all the tiddlers that are in the outline
  const tiddlersInOutline = $tw.wiki.filterTiddlers(`[[${rootTiddler}]get-stream-nodes:exclusive[]]`);
  return tiddlersInOutline;
};
declare let exports: {
  'linonetwo.principles': IFilterOperator;
};
exports['linonetwo.principles'] = principlesFilter;
