((app) => {
    'use strict'
    app.service('LinkedinService', ['$http', class PageService {

        constructor($http) {
            this.$http = $http
         }

         getLinkedinProfileInfo(limit) {
            var req = {
                  method: 'GET',
                  url: 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)?oauth2_access_token=AQXO9AAJhVYHpFzPnYxE6iKnDepnSnuQlyrcXlS0JIzQvLTfTGgpXG6cpbeDgl16usic6lapephPnqiCiG0bOjt4n6pbgKwbor6SFtL7iteUxEBEmu_9lUMtGJm2e7YdxwnM4XIEHYLY6jIFp8a-SK2DPRULYR9dCVHRqhrB1QbafvLWo9o&format',
                  headers: {
                      'x-li-format': 'json'
                  }
              }
              return this.$http(req)
          }

    }])
})(angular.module('app.services'))
