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
            - [x] Media data
            - [x] Media cover
            - [ ] edit media cover
            - [ ] edit/delete media
            - [x] add to user (entry)
        - [x] add entries
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
- automatic date
- image modal (show image when clicking on it)
- update image.
- admin permission (think thoroughly    )
- alphabeticall order
