/**
 * 
 * @param {string} source - source type of object
 * @param {string} id - in source stored id of object
 * @param {string} content - raw text data
 */
export class TextData {
  constructor(source, id, content){
    this.source = source
    this.id = id
    this.content = content
  }
}


/**
 * 
 * @param {string} id - id of source which will always be also the title
 * @param {string} title - title of source
 */
export class Source {
  constructor(id,  title){
    this.id = id
    this.title = title
  }
}


/**
 * 
 * @param {string} id - id of intention which will always be also the title
 * @param {string} title - title of intention
 */
export class Intention {
  constructor(id,  title){
    this.id = id
    this.title = title
  }
}


/**
 * 
 * @param {Number} id - id of tag
 * @param {string} title - title of tag
 */
export class Tag {
  constructor(id,  title){
    this.id = id
    this.title = title
  }
}


/**
 * 
 * @param {Number} textData - total count of TextData objects for source selection in database
 * @param {Number} alreadyLabeled - count of already labeled TextData for the query string
 * @param {Number} matches - count of labels which does contain a tag of query
 */
export class Statistics {
  constructor(textData, alreadyLabeled, matches){
    this.textData = textData
    this.alreadyLabeled = alreadyLabeled
    this.matches = matches    
  }
}


/**
 * 
 * @param {Tag[]} tags - Array of Tags where textData is stored in
 * @param {TextData} textData - text data to label
 */
export class Label {
  constructor(tags, textData){
    this.tags = tags
    this.textData = textData
  }
}
