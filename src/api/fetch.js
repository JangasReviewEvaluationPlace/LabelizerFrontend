import axios from 'axios'
import {
  TextData,
  Source,
  Tag,
  Statistics,
  Intention
} from './models.js';


export class FetchAuth {
  static axios_ = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/auth'
  })

  /**
   * 
   * @param {String} email 
   * @param {String} password 
   */
  static async postAuthentication(email, password){
    await this.axios_.post("authentication", {
      email: email, password: password
    })
  }
}


export class FetchLabelizerData {
  static axios_ = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/labelizer'
  })

  static async verifyToken(){
    await this.axios_.get('/');
  }

  /**
   * 
   * @returns {Source[]}
   */
  static async getAllSources(){
    const response = await this.axios_.get('/sources');
    const rawSources = response.data;
    return rawSources.map(rawSource => new Source(rawSource.id, rawSource.title))
  }

  /**
   * 
   * @returns {Intention[]}
   */
  static async getAllIntentions(){
    const response = await this.axios_.get('/intentions');
    const rawIntention = response.data;
    return rawIntention.map(rawIntention => new Intention(rawIntention.id, rawIntention.title))
  }

  /**
   * Get array of tag objects. If querystring with tags is in use,
   * it will return only tags includes the tags property
   * if it's not in use, it will return all tags.
   * 
   * @returns {Tag[]}
   */
  static async getTags(){
    const response = await this.axios_.get(`/tags${window.location.search}`);
    const rawTags = response.data;
    return rawTags.map(rawTag => new Tag(rawTag.id, rawTag.title));
  }

  /**
   * 
   * @returns {TextData}
   */
  static async getNextTextData(){
    const response = await this.axios_.get(`/label${window.location.search}`);
    const rawTextData = response.data;
    return new TextData(rawTextData.source, rawTextData.id, rawTextData.content)
  }

  /**
   * 
   * @returns {Statistics}
   */
  static async getStatistics(){
    const response = await this.axios_.get(`/statistics${window.location.search}`);
    const rawStatistics = response.data;
    return new Statistics(
      rawStatistics.text_data,
      rawStatistics.already_labeled,
      rawStatistics.matches
    );
  }

  /**
   * 
   * @param {Label} label 
   */
  static async postLabeledData(label){
    await this.axios_.post(`/label${window.location.search}`, {
      tags: label.tags,
      source: label.textData.source,
      id: label.textData.id
    })
  }
}
