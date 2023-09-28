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
        - [ ] Stats service

    - [ ] Controllers
        - [x] Users
            - [x] Upload profile
            - [x] get profile
        - [x] Media
            - [x] Upload cover
            - [x] get cover
        - [x] Entries
        - [x] Collections
        - [x] Collection Entries
        - [ ] Stats controller

- [x] frontend
    - [x] basic structure 
        - [x] landing
        - [x] sign up
        - [x] sign in
        - [x] profile
        - [x] error/info modal
        - [x] loading modal
            - [x] timeouts

    - [x] media
        - [x] media list
        - [x] create media
            - [x] emit event to reload
            - [x] Select instead of text field
        - [x] Media card
            - [x] truncate text if it does not fit
            - [x] Media data
            - [x] Media cover
            - [x] edit media cover
            - [x] edit/delete media
            - [x] add to user (entry)
        - [x] add entries
        - [x] user entry list
        - [x] user main page
    
    - [ ] Collections
        - [ ] collection layout
        - [ ] create collection
        - [ ] see collection items

    - [ ] Stats
        - [x] pie chart with quantity per type
            - [x] filter by year
            - [] filter by month
                - [ ] validation (choose month but not year)
        - [x] favourite genres (sort by total or year)

    - [ ] Visuals
        - [ ] animations
        - [x] styles
        - [x] all responsive

## Quick notes
- delete vuex user at error
- check if there is cover
- check if cover is image
- automatic date
- image modal (show image when clicking on it)
- update image.
- admin permission (think thoroughly    )
- alphabeticall order
- icons instead of words
- animations
- evento "auth failed" global
- check error user entries update event
- collection create modal 102
- add icons to every filter
- if a user is deleted, its media (and therefore any entries that reference that media ) will be deleted => investigate on cascade etc (maybe even not putting anything)
- loading while image loads


## Order
    - [x] 1.profile
    - 2. update media cover
    - 2.collections
    - 3.stats
    - 4.visuals
        - custom scroller