((app) => {
    'use strict'
    app.component("home", {
        templateUrl: 'js/components/home/home.html',
        controller: ['UserService', 'PageService', 'InstagramService', 'FacebookService','$state', 'ngMeta', 'SlackService', function(UserService, PageService, InstagramService, FacebookService, $state, ngMeta, SlackService) {
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
                    FacebookService.getFeeds(0).then((res) => {
                        this.posts_a = [];
                        this.posts_b = [];
                        this.posts_c = [];
                        res.data.data.forEach((el, index)=> {
                            FacebookService.getInfos(el.id).then((res) => {
                                if (index <= 2) {
                                    this.posts_a.push(res.data);
                                } else if (index <= 5) {
                                    this.posts_b.push(res.data);
                                } else {
                                    this.posts_c.push(res.data);
                                }
                            });
                        });
                    })

                    InstagramService.fetchPhotos().then((res)=> {
                        this.instagram = [];
                        res.data.data.forEach((el, index) => {
                            this.instagram.push(el);
                        })

                    })

                    // SlackService.postMessage('$general', 'helloworld')

                    ngMeta.setTitle('Vibe sharing | Home');
                    ngMeta.setTag('author', 'Hadrien Buret');
                    ngMeta.setTag('image', 'img/logo_vibesharing.png');
                }
            })
        }]
    })
})(angular.module('app.home'))
