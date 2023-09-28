# track-keeper
Track keeper is a small web app born of my obsession to keep track of every media i consume.
On it users can register the things they watch read or play as finished, on hold, etc.
This way all the categories of media are centralized in a single place and users can see statistics.

# Why
I am obssesed with writing down every movie, game and book i enjoy an i like looking back at the end of the year and see what i did that year and compare it with others.

I used to have a long excel file where i wrote everything i played and watched with date and other data but as it became longer and longer i  started to see it as a really janky method, so i thought it would be a good way of honing my (begginer) skills as a dev

# How
I am a begginer software engineer and i wanted to test myself by working on a project of my own. It is not only a way to see if i am capable of developping a full product but also a perfect way to improve my skills and most importantly see where i am lacking.

Most of the code is really clunky and could be cleaner and despite some initial work, the lack of thorough planinng before beggining to code is more than noticeable, specially in the frontend, where more than one component could have been generalized and reused.

Despite being what i planned the most, the backend is far from being great. Its scalabilty and performance are less than ideal, but considering this is not something to be used other than by me, maybe some friends, and most importantly, as a portfolio project, I consider it to be good enough (considering my current level).

All in all this is a great project born of a personal necessity that helped me improve a bit my skills as well as notice where i need more work.

# Technologies
This was build using vue for the backend with the help of vuetify for the styling, as graphic design is definitely not my passion. It is worth noting that vuetify is a great tool but i need to focus on my own styling and component making, so it would be best to use it sparingly.

As for the backend  i used nodejs with express. Javascript is a great language but i need to learn it thoroughly because i feel my use of it until now is pretty amateur and i'm not particularly proud of my code. Also, i have my differences with the language and maybe exploring other languages such as python, ruby or java could be worth it 




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