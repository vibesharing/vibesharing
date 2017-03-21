((app) => {
    'use strict'
    app.component("home", {
        templateUrl: 'js/components/home/home.html',
        controller: ['UserService', 'PageService', 'FacebookService','$state', 'ngMeta', 'SlackService',  function(UserService, PageService, FacebookService, $state, ngMeta, SlackService) {
            angular.extend(this, {
                editMode: false,
                cancel(){
                  this.editMode = false
                  $state.go('app.home', {}, { reload: true })
                },
                save() {
                    PageService.save(angular.copy(this.page)).then(()=>{
                      toastr.success(`${this.page.name} saved`)
                      this.editMode = false
                    }).catch((err)=>{
                      toastr.error(`${err.data}`)
                    })
                },
                $onInit() {
                    UserService.getCurrent().then((user) => {
                        this.user = user
                    }).catch((err) => {})

                    PageService.get('home').then((res) => {
                      this.page = res.data
                      if (this.page.content)
                        this.page.content = JSON.parse(this.page.content)
                    }).catch((err) =>{
                      console.log(err)
                    })
                    console.log('call')

                    FacebookService.getFeeds(3).then((res) => {
                        res.data.data.forEach((el)=> {
                            FacebookService.getInfos(el.id).then((res) => {
                            });
                        });
                    })

                    SlackService.postMessage('$general', 'helloworld')

                    ngMeta.setTitle('Vibe sharing | Home');
                    ngMeta.setTag('author', 'Hadrien Buret');
                    ngMeta.setTag('image', 'img/logo_vibesharing.png');
                }
            })
        }]
    })
})(angular.module('app.home'))
