                                                 tttt                                                 iiii          tttt                                                  
                                              ttt:::t                                                i::::i      ttt:::t                                                  
                                              t:::::t                                                 iiii       t:::::t                                                  
                                              t:::::t                                                            t:::::t                                                  
rrrrr   rrrrrrrrr       eeeeeeeeeeee    ttttttt:::::tttttttwwwwwww           wwwww           wwwwwwwiiiiiiittttttt:::::ttttttt        eeeeeeeeeeee    rrrrr   rrrrrrrrr   
r::::rrr:::::::::r    ee::::::::::::ee  t:::::::::::::::::t w:::::w         w:::::w         w:::::w i:::::it:::::::::::::::::t      ee::::::::::::ee  r::::rrr:::::::::r  
r:::::::::::::::::r  e::::::eeeee:::::eet:::::::::::::::::t  w:::::w       w:::::::w       w:::::w   i::::it:::::::::::::::::t     e::::::eeeee:::::eer:::::::::::::::::r 
rr::::::rrrrr::::::re::::::e     e:::::etttttt:::::::tttttt   w:::::w     w:::::::::w     w:::::w    i::::itttttt:::::::tttttt    e::::::e     e:::::err::::::rrrrr::::::r
r:::::r     r:::::re:::::::eeeee::::::e      t:::::t          w:::::w   w:::::w:::::w   w:::::w     i::::i      t:::::t          e:::::::eeeee::::::e r:::::r     r:::::r
r:::::r     rrrrrrre:::::::::::::::::e       t:::::t           w:::::w w:::::w w:::::w w:::::w      i::::i      t:::::t          e:::::::::::::::::e  r:::::r     rrrrrrr
r:::::r            e::::::eeeeeeeeeee        t:::::t            w:::::w:::::w   w:::::w:::::w       i::::i      t:::::t          e::::::eeeeeeeeeee   r:::::r            
r:::::r            e:::::::e                 t:::::t    tttttt   w:::::::::w     w:::::::::w        i::::i      t:::::t    tttttte:::::::e            r:::::r            
r:::::r            e::::::::e                t::::::tttt:::::t    w:::::::w       w:::::::w        i::::::i     t::::::tttt:::::te::::::::e           r:::::r            
r:::::r             e::::::::eeeeeeee        tt::::::::::::::t     w:::::w         w:::::w         i::::::i     tt::::::::::::::t e::::::::eeeeeeee   r:::::r            
r:::::r              ee:::::::::::::e          tt:::::::::::tt      w:::w           w:::w          i::::::i       tt:::::::::::tt  ee:::::::::::::e   r:::::r            
rrrrrrr                eeeeeeeeeeeeee            ttttttttttt         www             www           iiiiiiii         ttttttttttt      eeeeeeeeeeeeee   rrrrrrr            


if you want to run this programm on vps server with ubuntu 18.04 lts you will need to install missing packages.
You can just run script that is in root directory of the project 
`missing-ubuntu-packages.sh`

database connection:
mongodb
.env -> DB_NAME= here u should set your database name
to install and configure db u need to run `install-and-start-mongo.sh`
then initiate your databse:
 * `mongo`
 * `use retwitter`
 * `db.user.insert({name: "test", age: 99})`
 last step is just add simple record to the database to finalize the initialization db process
 now u can check if your db was created corectly:
 `show dbs`

You have to see your databases like:
```
admin      0.000GB
config     0.000GB
local      0.000GB
retwitter  0.000GB
test       0.000GB
```