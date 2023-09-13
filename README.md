# track-keeper
small giweb app that allows users to keep track of the books, movies, game, etc they complete

## TODO
- [ ] Backend
    - [x] Models
        - [x] User
        - [x] Media
        - [x] Entry
        - [x] Collection
        - [x] Collection Entry

    - [ ] Services
        - [x] User
        - [x] Media
        - [x] Entry
        - [x] Collection
        - [x] Collection Entry

    - [ ] Controllers
        - [ ] Users
            - [ ] Upload profile
            - [ ] get profile
        - [ ] Media
            - [x] Upload cover
            - [ ] get cover
        - [x] Entries
        - [x] Collections
        - [x] Collection Entries

- [ ] frontend
    - [ ] basic structure 
        - [ ] landing
        - [x] sign up
        - [x] sign in
        - [ ] profile
        - [x] error/info modal
        - [ ] password modal
        - [ ] loading modal

    - [ ] media
        - [x] media list
        - [ ] create media
            - [ ] emit event to reload
            - [ ] Select instead of text field
        - [ ] Media card
            - [ ] truncate text if it does not fit
            - [ ] Media data
            - [ ] Media cover
            - [ ] edit/delete media
            - [ ] add to user (entry)
        - [ ] add entries
        - [ ] user entry list
        - [ ] user main page
    
    - [ ] Collections
        - [ ] create collection
        - [ ] see collection items

    - [ ] Stats

## Quick notes
- delete vuex user at error
- check if there is cover
- check if cover is image
- grid distribution fixed for catalogue (+ scroll)
- pueden tener mismo nombre pero distinto tipo (batman arkham asylum)