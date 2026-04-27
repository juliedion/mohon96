/* ===================================================
   Mohonasen High School - Class of 1996
   Data + Application Logic
=================================================== */

// ── REUNION INFO ───────────────────────────────────
const REUNION_DATE = new Date('2026-07-31T18:00:00');

// ── CLASSMATES (from 1996 Totem Yearbook + Full Class List) ───
// status: "portrait" | "missing" = Warriors MIA | "fallen" = Fallen Warrior
const CLASSMATES = [
  { id:1,     first:'Nichole',                   mid:'L.',        last:'Alger',                   suf:'',      full:'Nichole L. Alger',                          status:'portrait',    page:1,  married:'Ogrodnick'  },
  { id:2,     first:'Carla',                     mid:'',          last:'Askew',                   suf:'',      full:'Carla Askew',                               status:'portrait',    page:1,  email:'Y2FybGFyb2Q0MjdAZ21haWwuY29t',   married:'Rodrigues'  },
  { id:3,     first:'Joel',                      mid:'C.',        last:'Baldwin',                 suf:'',      full:'Joel C. Baldwin',                           status:'portrait',    page:1,  email:'amNiMDUwODEwQGdtYWlsLmNvbQ=='  },
  { id:4,     first:'Jeremy',                    mid:'',          last:'Barnes',                  suf:'',      full:'Jeremy Barnes',                             status:'missing',     page:1  },
  { id:5,     first:'Christina',                 mid:'M.',        last:'Barone',                  suf:'',      full:'Christina M. Barone',                       status:'portrait',    page:1  },
  { id:6,     first:'Ida-Jo',                    mid:'M.',        last:'Barone',                  suf:'',      full:'Ida-Jo M. Barone',                          status:'portrait',    page:1,  email:'aWRham9zdWRhbm9AeWFob28uY29t',   married:'Sudano'     },
  { id:7,     first:'Douglas',                   mid:'L.',        last:'Bartling',                suf:'',      full:'Douglas L. Bartling',                       status:'portrait',    page:1  },
  { id:8,     first:'Bethany',                   mid:'K.',        last:'Beckett',                 suf:'',      full:'Bethany K. Beckett',                        status:'portrait',    page:1  },
  { id:9,     first:'Mark',                      mid:'M.',        last:'Belschwinder',            suf:'',      full:'Mark M. Belschwinder',                      status:'portrait',    page:1  },
  { id:10,    first:'Obed',                      mid:'David',     last:'Bhan',                    suf:'',      full:'Obed David Bhan',                           status:'missing',     page:1  },
  { id:11,    first:'Russ',                      mid:'E.',        last:'Bolle',                   suf:'',      full:'Russ E. Bolle',                             status:'portrait',    page:1  },
  { id:12,    first:'Jason',                     mid:'P.',        last:'Bolton',                  suf:'',      full:'Jason P. Bolton',                           status:'fallen',      page:16  },
  { id:13,    first:'Ross',                      mid:'',          last:'Boniecki',                suf:'',      full:'Ross Boniecki',                             status:'missing',     page:16  },
  { id:14,    first:'Keith',                     mid:'',          last:'Boscarino',               suf:'',      full:'Keith Boscarino',                           status:'missing',     page:1  },
  { id:15,    first:'Erin',                      mid:'',          last:'Brown',                   suf:'',      full:'Erin Brown',                                status:'portrait',    page:2  },
  { id:16,    first:'Jeremy',                    mid:'',          last:'Buechner',                suf:'',      full:'Jeremy Buechner',                           status:'portrait',    page:2,  email:'bG9jYWxhY3RvcnNndWlsZEBnbWFpbC5jb20='  },
  { id:18,    first:'Kelly',                     mid:'',          last:'Burke',                   suf:'',      full:'Kelly Burke',                               status:'portrait',    page:2,  married:'Friello'    },
  { id:19,    first:'Wendy',                     mid:'',          last:'Butterfield',             suf:'',      full:'Wendy Butterfield',                         status:'portrait',    page:2,  married:'Foshee'     },
  { id:20,    first:'Julie',                     mid:'C.',        last:'Buyea',                   suf:'',      full:'Julie C. Buyea',                            status:'portrait',    page:2  },
  { id:21,    first:'Lawrence',                  mid:'J.',        last:'Caban',                   suf:'',      full:'Lawrence J. Caban',                         status:'missing',     page:2  },
  { id:22,    first:'Renee',                     mid:'E.',        last:'Capeless',                suf:'',      full:'Renee E. Capeless',                         status:'fallen',      page:2  },
  { id:23,    first:'John',                      mid:'C.',        last:'Carey',                   suf:'',      full:'John C. Carey',                             status:'missing',     page:3  },
  { id:24,    first:'Carrie',                    mid:'',          last:'Carlow',                  suf:'',      full:'Carrie Carlow',                             status:'portrait',    page:2,  email:'Y3Jhc2hmb3JkMDEwNEBnbWFpbC5jb20=',  married:'Rashford'   },
  { id:25,    first:'Cheryl',                    mid:'',          last:'Carmichael',              suf:'',      full:'Cheryl Carmichael',                         status:'portrait',    page:2  },
  { id:26,    first:'David',                     mid:'M.',        last:'Clay',                    suf:'',      full:'David M. Clay',                             status:'portrait',    page:2  },
  { id:27,    first:'Heather',                   mid:'',          last:'Coffenberg',              suf:'',      full:'Heather Coffenberg',                        status:'portrait',    page:2,  email:'aGVhdGhlcmNvZmZlbmJlcmdAZ21haWwuY29t'  },
  { id:28,    first:'Heather',                   mid:'',          last:'D\'Arcy',                 suf:'',      full:'Heather D\'Arcy',                           status:'portrait',    page:3  },
  { id:29,    first:'Nichole',                   mid:'L.',        last:'Davis',                   suf:'',      full:'Nichole L. Davis',                          status:'missing',     page:3  },
  { id:30,    first:'Stephanie',                 mid:'A.',        last:'DeCatur',                 suf:'',      full:'Stephanie A. DeCatur',                      status:'missing',     page:16  },
  { id:31,    first:'Erika',                     mid:'',          last:'DeLorenzo',               suf:'',      full:'Erika DeLorenzo',                           status:'portrait',    page:3,  email:'ZWxwZWF0QG91dGxvb2suY29t',   married:'Peat'       },
  { id:32,    first:'Jill',                      mid:'',          last:'DeMarco',                 suf:'',      full:'Jill De Marco',                             status:'missing',     page:3  },
  { id:33,    first:'Paul',                      mid:'M.',        last:'Demkowski',               suf:'',      full:'Paul M. Demkowski',                         status:'portrait',    page:16  },
  { id:34,    first:'Kathleen',                  mid:'M.',        last:'Dennis',                  suf:'',      full:'Kathleen M. Dennis',                        status:'portrait',    page:3,  email:'a21kNzgzNEBtc24uY29t',   married:'Vest'       },
  { id:35,    first:'Mark',                      mid:'J.',        last:'Denolfo',                 suf:'Jr.',   full:'Mark J. Denolfo Jr.',                       status:'portrait',    page:3  },
  { id:36,    first:'Daniel',                    mid:'P.',        last:'DiBlasio',                suf:'',      full:'Daniel P. DiBlasio',                        status:'missing',     page:3  },
  { id:37,    first:'John',                      mid:'J.',        last:'Dillenbeck',              suf:'',      full:'John J. Dillenbeck',                        status:'missing',     page:3  },
  { id:38,    first:'Sarah',                     mid:'',          last:'Dingley',                 suf:'',      full:'Sarah Dingley',                             status:'fallen',      page:3  },
  { id:39,    first:'Cory',                      mid:'',          last:'Dinon',                   suf:'',      full:'Cory Dinon',                                status:'portrait',    page:4  },
  { id:41,    first:'David',                     mid:'W.',        last:'Dussault',                suf:'',      full:'David W. Dussault',                         status:'missing',     page:4  },
  { id:42,    first:'Shannon',                   mid:'',          last:'D’Ambrosio',              suf:'',      full:'Shannon D’Ambrosio',                        status:'portrait',    page:16  },
  { id:43,    first:'Heather',                   mid:'M.',        last:'Eckert',                  suf:'',      full:'Heather M. Eckert',                         status:'portrait',    page:4,  email:'aGVhdGhlcmpvcmRhbjAxMDNAZ21haWwuY29t',  married:'Jordan-Tse' },
  { id:44,    first:'Tracy',                     mid:'L.',        last:'Ellrott',                 suf:'',      full:'Tracy L. Ellrott',                          status:'portrait',    page:4,  married:'Sawyer'     },
  { id:45,    first:'Rosanna',                   mid:'',          last:'Escobar',                 suf:'',      full:'Rosanna Escobar',                           status:'portrait',    page:4,  married:'Brown'      },
  { id:46,    first:'Lisa',                      mid:'M.',        last:'Evans',                   suf:'',      full:'Lisa M. Evans',                             status:'portrait',    page:4  },
  { id:47,    first:'Ryan',                      mid:'P.',        last:'Fallon',                  suf:'',      full:'Ryan P. Fallon',                            status:'portrait',    page:4,  email:'ZnJlc2htbjEwMUBhb2wuY29t'  },
  { id:48,    first:'Noelle',                    mid:'M.',        last:'Ferraro',                 suf:'',      full:'Noelle M. Ferraro',                         status:'portrait',    page:4,  married:'Angellozzi' },
  { id:49,    first:'Nichole',                   mid:'',          last:'Fogg',                    suf:'',      full:'Nichole Fogg',                              status:'missing',     page:4  },
  { id:50,    first:'Mark',                      mid:'V.',        last:'Frederick',               suf:'',      full:'Mark V. Frederick',                         status:'portrait',    page:4  },
  { id:51,    first:'Michael',                   mid:'',          last:'Friello',                 suf:'',      full:'Michael Friello',                           status:'portrait',    page:4  },
  { id:52,    first:'Michael',                   mid:'J.',        last:'Fronk',                   suf:'',      full:'Michael J. Fronk',                          status:'missing',     page:4  },
  { id:53,    first:'Jaclyn',                    mid:'G.',        last:'Gallo',                   suf:'',      full:'Jaclyn G. Gallo',                           status:'portrait',    page:5,  married:'Paul'       },
  { id:54,    first:'Paul',                      mid:'A.',        last:'Gannon',                  suf:'',      full:'Paul A. Gannon',                            status:'portrait',    page:5  },
  { id:55,    first:'Roland',                    mid:'',          last:'Gau',                     suf:'',      full:'Roland Gau',                                status:'portrait',    page:5  },
  { id:56,    first:'Randy',                     mid:'S.',        last:'George',                  suf:'',      full:'Randy S. George',                           status:'fallen',      page:5  },
  { id:57,    first:'Lori',                      mid:'',          last:'Giordano',                suf:'',      full:'Lori Giordano',                             status:'portrait',    page:16, married:'VanDuzer'   },
  { id:58,    first:'David',                     mid:'',          last:'Girard',                  suf:'',      full:'David Girard',                              status:'portrait',    page:5,  email:'ZGdpcmFyZDRAZ21haWwuY29t'  },
  { id:59,    first:'Timothy',                   mid:'D.',        last:'Goard',                   suf:'',      full:'Timothy D. Goard',                          status:'portrait',    page:5  },
  { id:60,    first:'Sarah',                     mid:'E.',        last:'Godlewski',               suf:'',      full:'Sarah E. Godlewski',                        status:'missing',     page:16  },
  { id:61,    first:'Keith',                     mid:'N.',        last:'Gregory',                 suf:'',      full:'Keith N. Gregory',                          status:'missing',     page:5  },
  { id:62,    first:'Biagio',                    mid:'',          last:'Guida',                   suf:'',      full:'Biagio Guida',                              status:'portrait',    page:5  },
  { id:63,    first:'Brian',                     mid:'',          last:'Gustavson',               suf:'',      full:'Brian Gustavson',                           status:'portrait',    page:5  },
  { id:64,    first:'Melanie',                   mid:'K.',        last:'Guzzo',                   suf:'',      full:'Melanie K. Guzzo',                          status:'portrait',    page:5  },
  { id:65,    first:'Brian',                     mid:'K.',        last:'Haas',                    suf:'',      full:'Brian K. Haas',                             status:'missing',     page:5  },
  { id:66,    first:'Christy',                   mid:'L.',        last:'Hadsell',                 suf:'',      full:'Christy L. Hadsell',                        status:'missing',     page:5  },
  { id:67,    first:'Cory',                      mid:'J.',        last:'Hagin',                   suf:'',      full:'Cory J. Hagin',                             status:'missing',     page:16  },
  { id:68,    first:'Neil',                      mid:'A.',        last:'Hagin',                   suf:'III',   full:'Neil A. Hagin III',                         status:'portrait',    page:6  },
  { id:69,    first:'Angela',                    mid:'',          last:'Hall',                    suf:'',      full:'Angela Hall',                               status:'missing',     page:6  },
  { id:70,    first:'Michelle',                  mid:'A.',        last:'Hall',                    suf:'',      full:'Michelle A. Hall',                          status:'portrait',    page:16, married:'Segatto'    },
  { id:71,    first:'Sarah',                     mid:'',          last:'Hall',                    suf:'',      full:'Sarah Hall',                                status:'missing',     page:6  },
  { id:72,    first:'Timothy',                   mid:'J.',        last:'Halsdorf',                suf:'',      full:'Timothy J. Halsdorf',                       status:'missing',     page:6  },
  { id:73,    first:'Danae',                     mid:'',          last:'Handy',                   suf:'',      full:'Danae Handy',                               status:'missing',     page:6  },
  { id:74,    first:'Shannon',                   mid:'',          last:'Hayden',                  suf:'',      full:'Shannon Hayden',                            status:'portrait',    page:6,  email:'c2hhbm5vbjc3bWFyaWVAb3V0bG9vay5jb20=',  married:"O'Brien"    },
  { id:75,    first:'Loretta',                   mid:'',          last:'Haynes',                  suf:'',      full:'Loretta Haynes',                            status:'portrait',    page:6,  email:'bGlseWxtdEBhb2wuY29t',   married:'Murray'     },
  { id:76,    first:'Johna',                     mid:'A.',        last:'Higgins',                 suf:'',      full:'Johna A. Higgins',                          status:'missing',     page:6  },
  { id:77,    first:'Tracie',                    mid:'L.',        last:'Holland',                 suf:'',      full:'Tracie L. Holland',                         status:'portrait',    page:6,  married:'Nichols'    },
  { id:78,    first:'Melissa',                   mid:'',          last:'Hotaling',                suf:'',      full:'Melissa Hotaling',                          status:'missing',     page:6  },
  { id:79,    first:'Sarah',                     mid:'A.',        last:'Hutchins',                suf:'',      full:'Sarah A. Hutchins',                         status:'portrait',    page:6,  married:'Scott'      },
  { id:80,    first:'Laura',                     mid:'L.',        last:'Immeke',                  suf:'',      full:'Laura L. Immeke',                           status:'portrait',    page:6,  married:'Ashdown'    },
  { id:81,    first:'Tricia',                    mid:'D.',        last:'Ippolito',                suf:'',      full:'Tricia D. Ippolito',                        status:'portrait',    page:7  },
  { id:82,    first:'Jason',                     mid:'J.',        last:'Isabella',                suf:'',      full:'Jason J. Isabella',                         status:'missing',     page:7  },
  { id:84,    first:'Sarah',                     mid:'E.',        last:'Jackett',                 suf:'',      full:'Sarah E. Jackett',                          status:'missing',     page:7  },
  { id:85,    first:'Wendy',                     mid:'',          last:'Jamack',                  suf:'',      full:'Wendy Jamack',                              status:'portrait',    page:7,  email:'anVsZXNfd2VuZHlkYW5jZUB5YWhvby5jb20=',  married:'Jules'  },
  { id:86,    first:'Christopher',               mid:'A.',        last:'Jones',                   suf:'',      full:'Christopher A. Jones',                      status:'missing',     page:7  },
  { id:87,    first:'Melissa',                   mid:'M.',        last:'Jones',                   suf:'',      full:'Melissa M. Jones',                          status:'portrait',    page:7,  email:'bW1qYXB2QHlhaG9vLmNvbQ=='  },
  { id:88,    first:'Serena',                    mid:'E.',        last:'Kearney',                 suf:'',      full:'Serena E. Kearney',                         status:'portrait',    page:7  },
  { id:89,    first:'Stephanie',                 mid:'',          last:'Keeler',                  suf:'',      full:'Stephanie Keeler',                          status:'missing',     page:7  },
  { id:90,    first:'Megan',                     mid:'B.',        last:'Kilcullen',               suf:'',      full:'Megan B. Kilcullen',                        status:'missing',     page:7  },
  { id:91,    first:'Crystal',                   mid:'D.',        last:'Knauss',                  suf:'',      full:'Crystal D. Knauss',                         status:'missing',     page:7,  married:'Kruse'      },
  { id:92,    first:'Sarah',                     mid:'',          last:'Kowalski',                suf:'',      full:'Sarah Kowalski',                            status:'portrait',    page:7,  email:'c2FyYWhyb2JpbndyaWdodEBnbWFpbC5jb20=',  married:'Wright'     },
  { id:93,    first:'Jason',                     mid:'',          last:'Kristel',                 suf:'',      full:'Jason Kristel',                             status:'missing',     page:7  },
  { id:94,    first:'Angelica',                  mid:'',          last:'LaMalfa',                 suf:'',      full:'Angelica LaMalfa',                          status:'portrait',    page:16  },
  { id:95,    first:'Shannon',                   mid:'',          last:'Lane',                    suf:'',      full:'Shannon Lane',                              status:'portrait',    page:8  },
  { id:96,    first:'Sean',                      mid:'W.',        last:'Lasher',                  suf:'',      full:'Sean W. Lasher',                            status:'portrait',    page:8  },
  { id:97,    first:'Timothy',                   mid:'',          last:'Lawrence',                suf:'',      full:'Timothy Lawrence',                          status:'portrait',    page:8  },
  { id:98,    first:'William',                   mid:'P.',        last:'Lederman',                suf:'',      full:'William P. Lederman',                       status:'portrait',    page:8  },
  { id:99,    first:'Mark',                      mid:'',          last:'Lesniewski',              suf:'',      full:'Mark Lesniewski',                           status:'missing',     page:16  },
  { id:100,   first:'Christina',                 mid:'',          last:'Levito',                  suf:'',      full:'Christina Levito',                          status:'portrait',    page:8,  email:'Y3BrYWd1aWRvQGdtYWlsLmNvbQ==',   married:'Guido'      },
  { id:101,   first:'Heather',                   mid:'',          last:'Liska',                   suf:'',      full:'Heather Liska',                             status:'portrait',    page:8,  married:'Makowski'   },
  { id:102,   first:'Jennifer',                  mid:'',          last:'DeLoreto',                suf:'',      full:'Jennifer DeLoreto',                         status:'portrait',    page:3,  married:'Rounds'     },
  { id:103,   first:'Jeffrey',                   mid:'',          last:'Lupi',                    suf:'',      full:'Jeffrey Lupi',                              status:'portrait',    page:16,  email:'bnlqamVmZkBhb2wuY29t'  },
  { id:104,   first:'Richard',                   mid:'G.',        last:'Lyons',                   suf:'',      full:'Richard G. Lyons',                          status:'missing',     page:8  },
  { id:105,   first:'Nancy',                     mid:'A.',        last:'Mac',                     suf:'',      full:'Nancy A. Mac',                              status:'portrait',    page:8  },
  { id:106,   first:'David',                     mid:'',          last:'MacDormand',              suf:'Jr.',   full:'David MacDormand Jr.',                      status:'portrait',    page:8  },
  { id:107,   first:'Cory',                      mid:'T.',        last:'Maloney',                 suf:'',      full:'Cory T. Maloney',                           status:'portrait',    page:8,  email:'Y3RtYWxvbmV5QHlhaG9vLmNvbQ=='  },
  { id:108,   first:'Nicholas',                  mid:'',          last:'Marano',                  suf:'',      full:'Nicholas Marano',                           status:'portrait',    page:8  },
  { id:109,   first:'Gerardo',                   mid:'',          last:'Marino',                  suf:'',      full:'Gerardo Marino',                            status:'missing',     page:9  },
  { id:110,   first:'Jennifer',                  mid:'L.',        last:'Marion',                  suf:'',      full:'Jennifer L. Marion',                        status:'portrait',    page:9  },
  { id:111,   first:'Gina',                      mid:'M.',        last:'Marks',                   suf:'',      full:'Gina M. Marks',                             status:'portrait',    page:9,  married:'Pereira'    },
  { id:112,   first:'Jason',                     mid:'N.',        last:'Marx',                    suf:'',      full:'Jason N. Marx',                             status:'portrait',    page:9  },
  { id:113,   first:'Travis',                    mid:'L.',        last:'Maré',                    suf:'',      full:'Travis L. Maré',                            status:'missing',     page:8  },
  { id:114,   first:'Michael',                   mid:'F.',        last:'Mazzarella',              suf:'',      full:'Michael F. Mazzarella',                     status:'missing',     page:9  },
  { id:115,   first:'Timothy',                   mid:'G.',        last:'McCormack',               suf:'',      full:'Timothy G. McCormack',                      status:'missing',     page:9  },
  { id:116,   first:'Brian',                     mid:'',          last:'McDonnell',               suf:'',      full:'Brian McDonnell',                           status:'missing',     page:9  },
  { id:118,   first:'Michelle',                  mid:'',          last:'McGinty',                 suf:'',      full:'Michelle McGinty',                          status:'portrait',    page:9,  married:'Miller'     },
  { id:119,   first:'Gregory',                   mid:'',          last:'McGrath',                 suf:'',      full:'Gregory McGrath',                           status:'portrait',    page:9  },
  { id:120,   first:'Stacia',                    mid:'C.',        last:'Messere',                 suf:'',      full:'Stacia C. Messere',                         status:'portrait',    page:9,  married:'Devine'     },
  { id:121,   first:'John',                      mid:'W.',        last:'Messerle',                suf:'',      full:'John W. Messerle',                          status:'portrait',    page:9  },
  { id:122,   first:'Nicole',                    mid:'M. De',     last:'Midio',                   suf:'',      full:'Nicole M. De Midio',                        status:'portrait',    page:3  },
  { id:123,   first:'Angela',                    mid:'',          last:'Millen',                  suf:'',      full:'Angela Millen',                             status:'portrait',    page:9,  email:'YW5nYnJvb2tzMjRAZ21haWwuY29t',   married:'Brooks'     },
  { id:124,   first:'Daniel',                    mid:'W.',        last:'Miller',                  suf:'',      full:'Daniel W. Miller',                          status:'missing',     page:16  },
  { id:125,   first:'Dennis',                    mid:'J.',        last:'Miller',                  suf:'',      full:'Dennis J. Miller',                          status:'missing',     page:10  },
  { id:126,   first:'Justin',                    mid:'H.',        last:'Miller',                  suf:'',      full:'Justin H. Miller',                          status:'portrait',    page:10  },
  { id:127,   first:'Brian',                     mid:'D.',        last:'Minbiole',                suf:'',      full:'Brian D. Minbiole',                         status:'fallen',      page:10  },
  { id:128,   first:'Nicole',                    mid:'',          last:'Minersagen',              suf:'',      full:'Nicole Minersagen',                         status:'portrait',    page:10,  email:'YXVudG5pbjc4NzdAZ21haWwuY29t'  },
  { id:129,   first:'Mary',                      mid:'',          last:'Montgomery',              suf:'',      full:'Mary Montgomery',                           status:'portrait',    page:10, email:'bWFyeWtvbGxhcjM0QGdtYWlsLmNvbQ==',   married:'Kollar'     },
  { id:130,   first:'Melissa',                   mid:'A.',        last:'Moore',                   suf:'',      full:'Melissa A. Moore',                          status:'portrait',    page:10, married:'Swan'       },
  { id:131,   first:'Melissa',                   mid:'',          last:'Morton',                  suf:'',      full:'Melissa Morton',                            status:'missing',     page:10  },
  { id:132,   first:'Monica',                    mid:'',          last:'Muniz',                   suf:'',      full:'Monica Muniz',                              status:'portrait',    page:16, married:'DiCocco'    },
  { id:133,   first:'Alfredo',                   mid:'',          last:'Musumeci',                suf:'',      full:'Alfredo Musumeci',                          status:'missing',     page:10  },
  { id:134,   first:'Antonella',                 mid:'',          last:'Musumeci',                suf:'',      full:'Antonella Musumeci',                        status:'portrait',    page:10, married:'Riccio'     },
  { id:135,   first:'Brittani',                  mid:'M.',        last:'Nass',                    suf:'',      full:'Brittani M. Nass',                          status:'portrait',    page:10  },
  { id:136,   first:'Nicola',                    mid:'V.',        last:'Natale',                  suf:'',      full:'Nicola V. Natale',                          status:'portrait',    page:10  },
  { id:137,   first:'Brian',                     mid:'J.',        last:'Nealon',                  suf:'',      full:'Brian J. Nealon',                           status:'portrait',    page:10  },
  { id:138,   first:'Andrew',                    mid:'',          last:'Nedvidek',                suf:'',      full:'Andrew Nedvidek',                           status:'missing',     page:11  },
  { id:139,   first:'Michael',                   mid:'T.',        last:'O\'Donnell',              suf:'',      full:'Michael T. O\'Donnell',                     status:'portrait',    page:11  },
  { id:140,   first:'Andrea',                    mid:'M.',        last:'Ody',                     suf:'',      full:'Andrea M. Ody',                             status:'missing',     page:11, married:'DeLuke'     },
  { id:141,   first:'Heather',                   mid:'',          last:'Oleniczac',               suf:'',      full:'Heather Oleniczac',                         status:'portrait',    page:11, married:'Preissler'  },
  { id:142,   first:'Keith',                     mid:'',          last:'Oliver',                  suf:'',      full:'Keith Oliver',                              status:'missing',     page:11  },
  { id:143,   first:'Erica',                     mid:'',          last:'Olmstead',                suf:'',      full:'Erica Olmstead',                            status:'portrait',    page:11  },
  { id:144,   first:'Sarah',                     mid:'',          last:'Paige',                   suf:'',      full:'Sarah Paige',                               status:'portrait',    page:11, married:"D'Elisiis"  },
  { id:145,   first:'Carla',                     mid:'M.',        last:'Palleschi',               suf:'',      full:'Carla M. Palleschi',                        status:'portrait',    page:11, married:'Leto'       },
  { id:146,   first:'Melissa',                   mid:'A.',        last:'Palleschi',               suf:'',      full:'Melissa A. Palleschi',                      status:'missing',     page:11  },
  { id:147,   first:'Peggy',                     mid:'',          last:'Paolelli',                suf:'',      full:'Peggy Paolelli',                            status:'portrait',    page:11  },
  { id:148,   first:'Christopher',               mid:'',          last:'Paolucci',                suf:'',      full:'Christopher Paolucci',                      status:'portrait',    page:11,  email:'Y2hyaXNwYW9sdWNjaUBnbWFpbC5jb20='  },
  { id:149,   first:'Suzanne',                   mid:'M.',        last:'Patka',                   suf:'',      full:'Suzanne M. Patka',                          status:'portrait',    page:11, email:'c2x1cGlhQG91dGxvb2suY29t',   married:'Lupia'      },
  { id:150,   first:'Christopher',               mid:'',          last:'Peat',                    suf:'',      full:'Christopher Peat',                          status:'missing',     page:12  },
  { id:151,   first:'Andrew',                    mid:'',          last:'Pedersen',                suf:'',      full:'Andrew Pedersen',                           status:'portrait',    page:12  },
  { id:152,   first:'Steven',                    mid:'M.',        last:'Peters',                  suf:'',      full:'Steven M. Peters',                          status:'portrait',    page:12  },
  { id:153,   first:'Gina',                      mid:'M.',        last:'Piccola',                 suf:'',      full:'Gina M. Piccola',                           status:'portrait',    page:12,  email:'Z2p3aW5rMzI5QGdtYWlsLmNvbQ==',  married:'Winkler'  },
  { id:154,   first:'Justine',                   mid:'M.',        last:'Pierce',                  suf:'',      full:'Justine M. Pierce',                         status:'portrait',    page:12  },
  { id:155,   first:'Daniel',                    mid:'O.',        last:'Priotti',                 suf:'',      full:'Daniel O. Priotti',                         status:'portrait',    page:12  },
  { id:156,   first:'Rose',                      mid:'',          last:'Pugliese',                suf:'',      full:'Rose Pugliese',                             status:'missing',     page:12  },
  { id:157,   first:'Shane',                     mid:'',          last:'Quant',                   suf:'',      full:'Shane Quant',                               status:'portrait',    page:16  },
  { id:158,   first:'Matthew',                   mid:'J.',        last:'Rafalik',                 suf:'',      full:'Matthew J. Rafalik',                        status:'portrait',    page:12,  email:'bWpyYWZhbGlrQGdtYWlsLmNvbQ=='  },
  { id:159,   first:'Nicholas',                  mid:'',          last:'Ragucci',                 suf:'',      full:'Nicholas Ragucci',                          status:'portrait',    page:12  },
  { id:160,   first:'Michael',                   mid:'A.',        last:'Randolph',                suf:'',      full:'Michael A. Randolph',                       status:'missing',     page:12  },
  { id:161,   first:'Jason',                     mid:'',          last:'Reed',                    suf:'',      full:'Jason Reed',                                status:'missing',     page:16  },
  { id:162,   first:'Edward',                    mid:'M.',        last:'Reilly',                  suf:'',      full:'Edward M. Reilly',                          status:'missing',     page:16  },
  { id:163,   first:'Jennifer',                  mid:'D.',        last:'Relyea',                  suf:'',      full:'Jennifer D. Relyea',                        status:'portrait',    page:12, married:'Yager'      },
  { id:164,   first:'Richard',                   mid:'',          last:'Reohr',                   suf:'',      full:'Richard Reohr',                             status:'missing',     page:12  },
  { id:165,   first:'Jodi',                      mid:'E.',        last:'Rickard',                 suf:'',      full:'Jodi E. Rickard',                           status:'portrait',    page:13, married:'Vongsakoun' },
  { id:166,   first:'Jason',                     mid:'',          last:'Rochek',                  suf:'',      full:'Jason Rochek',                              status:'portrait',    page:13  },
  { id:167,   first:'Andrea',                    mid:'A.',        last:'Roman',                   suf:'',      full:'Andrea A. Roman',                           status:'portrait',    page:13, married:'Halbreiner' },
  { id:168,   first:'Jessica',                   mid:'',          last:'Ross',                    suf:'',      full:'Jessica Ross',                              status:'portrait',    page:13,  email:'dm9sbGVlMThAeWFob28uY29t',  married:'Kozlowski'  },
  { id:169,   first:'Julie',                     mid:'A.',        last:'Rosse',                   suf:'',      full:'Julie A. Rosse',                            status:'portrait',    page:13, email:'anVsaWVkaW9uMUBnbWFpbC5jb20=',  married:'Dion'       },
  { id:170,   first:'Christopher',               mid:'J.',        last:'Rossi',                   suf:'',      full:'Christopher J. Rossi',                      status:'portrait',    page:13  },
  { id:171,   first:'Robert',                    mid:'',          last:'Rotter',                  suf:'',      full:'Robert Rotter',                             status:'portrait',    page:13  },
  { id:172,   first:'Joshua',                    mid:'R.',        last:'Sabatini',                suf:'',      full:'Joshua R. Sabatini',                        status:'missing',     page:13  },
  { id:173,   first:'Maria',                     mid:'',          last:'Sacchetti',               suf:'',      full:'Maria Sacchetti',                           status:'portrait',    page:13  },
  { id:174,   first:'Amanda',                    mid:'',          last:'Sanger',                  suf:'',      full:'Amanda Sanger',                             status:'portrait',    page:13, email:'YW1hbmRhLnNhbmdlckBnbWFpbC5jb20=',   married:'Lomanto'    },
  { id:175,   first:'Luisa',                     mid:'',          last:'Santabarbara',            suf:'',      full:'Luisa Santabarbara',                        status:'portrait',    page:13, married:'Groulx'     },
  { id:176,   first:'Gary',                      mid:'P.',        last:'Sarnowicz',               suf:'',      full:'Gary P. Sarnowicz',                         status:'portrait',    page:13  },
  { id:177,   first:'Sarah',                     mid:'',          last:'Schaible',                suf:'',      full:'Sarah Schaible',                            status:'portrait',    page:14, married:'Walsh'      },
  { id:178,   first:'Jennifer',                  mid:'',          last:'Schlegel',                suf:'',      full:'Jennifer Schlegel',                         status:'portrait',    page:14, email:'amVubmlmZXJtb250cnltQGdtYWlsLmNvbQ==',  married:'Montrym'    },
  { id:179,   first:'Robert',                    mid:'H.',        last:'Scholz',                  suf:'Jr.',   full:'Robert H. Scholz Jr.',                      status:'missing',     page:14  },
  { id:180,   first:'Joseph',                    mid:'L.',        last:'Scott',                   suf:'',      full:'Joseph L. Scott',                           status:'portrait',    page:14  },
  { id:181,   first:'Craig',                     mid:'A.',        last:'Serafini',                suf:'',      full:'Craig A. Serafini',                         status:'portrait',    page:14  },
  { id:182,   first:'Michael',                   mid:'',          last:'Serapilio',               suf:'',      full:'Michael Serapilio',                         status:'missing',     page:14  },
  { id:183,   first:'Marisa',                    mid:'',          last:'Sgueglia',                suf:'',      full:'Marisa Sgueglia',                           status:'portrait',    page:14, married:'Nadia'      },
  { id:184,   first:'Timothy',                   mid:'P.',        last:'Shannon',                 suf:'',      full:'Timothy P. Shannon',                        status:'portrait',    page:14,  email:'ZnJ1bjEyMjFAZ21haWwuY29t'  },
  { id:185,   first:'Gina',                      mid:'L.',        last:'Sifo',                    suf:'',      full:'Gina L. Sifo',                              status:'missing',     page:14  },
  { id:186,   first:'Ross',                      mid:'M.',        last:'Snyder',                  suf:'',      full:'Ross M. Snyder',                            status:'missing',     page:14  },
  { id:187,   first:'Sarah',                     mid:'',          last:'Snyder',                  suf:'',      full:'Sarah Snyder',                              status:'portrait',    page:14  },
  { id:188,   first:'Andrew',                    mid:'M.',        last:'Sorenson',                suf:'',      full:'Andrew M. Sorenson',                        status:'missing',     page:16  },
  { id:189,   first:'Clifton',                   mid:'B.',        last:'Stringfellow',            suf:'',      full:'Clifton B. Stringfellow',                   status:'portrait',    page:14  },
  { id:190,   first:'Jacquelyn',                 mid:'',          last:'Sukala',                  suf:'',      full:'Jacquelyn Sukala',                          status:'portrait',    page:15, married:'Norris'     },
  { id:192,   first:'Michael',                   mid:'A.',        last:'Teetsel',                 suf:'',      full:'Michael A. Teetsel',                        status:'portrait',    page:16  },
  { id:193,   first:'Benjamin',                  mid:'W.',        last:'Teriele',                 suf:'',      full:'Benjamin W. Teriele',                       status:'missing',     page:15  },
  { id:194,   first:'Kevin',                     mid:'R.',        last:'Thomas',                  suf:'',      full:'Kevin R. Thomas',                           status:'portrait',    page:15  },
  { id:195,   first:'Amanda',                    mid:'L.',        last:'Tinning',                 suf:'',      full:'Amanda L. Tinning',                         status:'portrait',    page:15  },
  { id:196,   first:'Jason',                     mid:'B.',        last:'Truelove',                suf:'',      full:'Jason B. Truelove',                         status:'missing',     page:15  },
  { id:197,   first:'Charleen',                  mid:'M.',        last:'Tuchovsky',               suf:'',      full:'Charleen M. Tuchovsky',                     status:'missing',     page:15  },
  { id:198,   first:'Paula',                     mid:'L.',        last:'Turpin',                  suf:'',      full:'Paula L. Turpin',                           status:'portrait',    page:15  },
  { id:199,   first:'Shawn',                     mid:'C.',        last:'Urban',                   suf:'',      full:'Shawn C. Urban',                            status:'missing',     page:15  },
  { id:200,   first:'Tera',                      mid:'D.',        last:'Varrone',                 suf:'',      full:'Tera D. Varrone',                           status:'missing',     page:15  },
  { id:201,   first:'Amy',                       mid:'',          last:'Vaughan',                 suf:'',      full:'Amy Vaughan',                               status:'portrait',    page:15, married:'Struffolino'},
  { id:202,   first:'Joseph',                    mid:'',          last:'Villano',                 suf:'',      full:'Joseph Villano',                            status:'portrait',    page:15  },
  { id:203,   first:'Matthew',                   mid:'',          last:'Visscher',                suf:'',      full:'Matthew Visscher',                          status:'portrait',    page:15  },
  { id:204,   first:'Karen',                     mid:'',          last:'Wainwright',              suf:'',      full:'Karen Wainwright',                          status:'fallen',      page:16  },
  { id:205,   first:'Kevin',                     mid:'',          last:'Welch',                   suf:'',      full:'Kevin Welch',                               status:'missing',     page:16  },
  { id:206,   first:'Christina',                 mid:'L.',        last:'Welsch',                  suf:'',      full:'Christina L. Welsch',                       status:'portrait',    page:16  },
  { id:207,   first:'Nicholas',                  mid:'',          last:'Whipple',                 suf:'',      full:'Nicholas Whipple',                          status:'portrait',    page:16  },
  { id:208,   first:'Ed',                        mid:'Ed',        last:'White',                   suf:'IV',    full:'Ed White IV',                               status:'portrait',    page:16  },
  { id:209,   first:'Stephen',                   mid:'L.',        last:'Wilgocki',                suf:'',      full:'Stephen L. Wilgocki',                       status:'missing',     page:16  },
  { id:210,   first:'Jason',                     mid:'',          last:'Winkler',                 suf:'',      full:'Jason Winkler',                             status:'portrait',    page:16  },
  { id:211,   first:'Ronald',                    mid:'',          last:'Wood',                    suf:'Jr.',   full:'Ronald Wood Jr.',                           status:'missing',     page:16  },
  { id:212,   first:'Michael',                   mid:'T.',        last:'Wright',                  suf:'',      full:'Michael T. Wright',                         status:'portrait',    page:16  },
  { id:213,   first:'Amy',                       mid:'',          last:'Yeung',                   suf:'',      full:'Amy Yeung',                                 status:'missing',     page:16  },
];


// ── SURVEY RESPONDENTS ────────────────────────────
// Emails are base-64 encoded for basic display protection
const SURVEY = [
  { name:'Julie Dion',                   email:'anVsaWVkaW9uMUBnbWFpbC5jb20=',       attending:'Yes',   maiden:'' },
  { name:'Erika DeLorenzo Peat',         email:'RWxwZWF0QG91dGxvb2suY29t',           attending:'Yes',   maiden:'' },
  { name:"Shannon O'Brien",              email:'U2hhbm5vbjc3bWFyaWVAb3V0bG9vay5jb20=', attending:'Yes', maiden:'Hayden' },
  { name:'Loretta Haynes Murray',        email:'TGlseUxNVEBhb2wuY29t',               attending:'Yes',   maiden:'Haynes' },
  { name:'Jeff Lupi',                    email:'TnlqamVmZkBhb2wuY29t',               attending:'Yes',   maiden:'' },
  { name:'Christina Guido',              email:'Q3BrYWd1aWRvQGdtYWlsLmNvbQ==',       attending:'Yes',   maiden:'Levito' },
  { name:'JJ Buechner',                  email:'TG9jYWxhY3RvcnNndWlsZEBnbWFpbC5jb20=', attending:'Yes', maiden:'' },
  { name:'Tim Shannon',                  email:'ZnJ1bjEyMjFAZ21haWwuY29t',           attending:'Yes',   maiden:'' },
  { name:'Carrie Carlow Rashford',       email:'Y3Jhc2hmb3JkMDEwNEBnbWFpbC5jb20=',  attending:'Yes',   maiden:'Carlow' },
  { name:'Cory Maloney',                 email:'Q3RtYWxvbmV5QHlhaG9vLmNvbQ==',       attending:'Yes',   maiden:'' },
  { name:'Suzanne Patka',                email:'c2x1cGlhQG91dGxvb2suY29t',           attending:'Yes',   maiden:'Patka' },
  { name:'Matthew Rafalik',              email:'TWpyYWZhbGlrQGdtYWlsLmNvbQ==',       attending:'No',    maiden:'' },
  { name:'David Girard',                 email:'ZGdpcmFyZDRAZ21haWwuY29t',           attending:'Yes',   maiden:'' },
  { name:'Jessica Ross',                 email:'Vm9sbGVlMThAeWFob28uY29t',           attending:'Yes',   maiden:'' },
  { name:'Heather Jordan-Tse',           email:'SGVhdGhlcmpvcmRhbjAxMDNAZ21haWwuY29t', attending:'Yes', maiden:'Eckert' },
  { name:'Angela Brooks',                email:'YW5nYnJvb2tzMjRAZ21haWwuY29t',       attending:'Yes',   maiden:'Millen' },
  { name:'Sarah Wright',                 email:'U2FyYWhyb2JpbndyaWdodEBnbWFpbC5jb20=', attending:'Maybe', maiden:'Kowalski' },
  { name:'Chris Paolucci',               email:'Y2hyaXNwYW9sdWNjaUBnbWFpbC5jb20=',  attending:'Yes',   maiden:'' },
  { name:'Jennifer Montrym',             email:'amVubmlmZXJtb250cnltQGdtYWlsLmNvbQ==', attending:'Yes', maiden:'Schlegel' },
  { name:'Kathy Vest',                   email:'S21kNzgzNEBtc24uY29t',               attending:'Yes',   maiden:'Dennis' },
  { name:'Gina Piccola',                 email:'R2p3aW5rMzI5QGdtYWlsLmNvbQ==',       attending:'Yes',   maiden:'' },
  { name:'Jamack',                       email:'SnVsZXNfd2VuZHlkYW5jZUB5YWhvby5jb20=', attending:'Maybe', maiden:'' },
  { name:'Mary Montgomery Kollar',       email:'bWFyeWtvbGxhcjM0QGdtYWlsLmNvbQ==',  attending:'Yes',   maiden:'Montgomery' },
  { name:'Melissa Jones',                email:'bW1qYXB2QHlhaG9vLmNvbQ==',           attending:'Maybe', maiden:'' },
  { name:'Ida-Jo Sudano',                email:'aWRham9zdWRhbm9AeWFob28uY29t',       attending:'Yes',   maiden:'Barone' },
  { name:'Amanda Sanger Lomanto',        email:'YW1hbmRhLnNhbmdlckBnbWFpbC5jb20=',  attending:'Maybe', maiden:'Sanger' },
  { name:'Nicki Minersagen',             email:'QXVudG5pbjc4NzdAZ21haWwuY29t',       attending:'Maybe', maiden:'' },
  { name:'Heather Coffenberg',           email:'SGVhdGhlcmNvZmZlbmJlcmdAZ21haWwuY29t', attending:'Yes', maiden:'' },
  { name:'Carla Rodrigues',              email:'Y2FybGFyb2Q0MjdAZ21haWwuY29t',       attending:'Yes',   maiden:'Askew' },
  { name:'Joel Baldwin',                 email:'SmNiMDUwODEwQGdtYWlsLmNvbQ==',       attending:'Yes',   maiden:'' },
];

// ── EMAIL UTILS ────────────────────────────────────
function decodeEmail(b64) {
  try { return atob(b64); } catch(e) { return null; }
}

function maskEmail(b64) {
  const em = decodeEmail(b64);
  if (!em) return '???';
  const [local, domain] = em.split('@');
  if (!domain) return em;
  const [dname, ...tlds] = domain.split('.');
  const maskedLocal = local[0] + '*'.repeat(Math.min(local.length - 1, 5));
  const maskedDomain = dname[0] + '*'.repeat(Math.min(dname.length - 1, 4));
  return `${maskedLocal}@${maskedDomain}.${tlds.join('.')}`;
}

function sendEmail(b64) {
  const em = decodeEmail(b64);
  if (em) window.open('mailto:' + em, '_self');
}

// ── FORWARD MESSAGE ────────────────────────────────
function buildForwardMessage(name, isMissing) {
  const type = isMissing
    ? `We've lost touch with ${name} and are trying to find them!`
    : `We'd love to have a way to reach ${name} for our reunion!`;

  return `Hey! 👋

Do you know ${name} from Mohonasen High School Class of 1996?

${type}

Our 30-YEAR REUNION is coming up:
📅 Friday, July 31, 2026 at 6:00 PM
📍 Katie O'Byrnes Irish Pub
   121 Wall Street, State Street & Erie Blvd
   Schenectady, NY 12305
💰 Just $20/person · Appetizers & Cash Bar
🏨 Hotel: https://www.hilton.com/en/hotels/albsyhx-hampton-schenectady-downtown/

If you have their contact info, please forward this to them or reply to me!

Connect with us on Facebook:
facebook.com/search/top?q=mohonasen%20hs%20class%20of%201996

Contact Gina Marx Pereira or Sue Patka Lupia with any info.

Go Warriors! 🧡🖤`;
}

// ── MODAL ──────────────────────────────────────────
let currentForwardName = '';
let currentForwardMissing = false;

function showForwardModal(name, isMissing, firstName) {
  currentForwardName = name;
  currentForwardMissing = isMissing;
  const fn = firstName || name.split(' ')[0];
  const overlay = document.getElementById('forwardModal');
  document.getElementById('modalName').textContent = `Do you know ${fn}?`;
  document.getElementById('modalDesc').textContent = isMissing
    ? `We've lost touch with ${name}. Send this message to someone who might be able to reach them!`
    : `Forward reunion details to ${name} or someone who can pass it along.`;
  document.getElementById('modalPreview').textContent = buildForwardMessage(name, isMissing);

  // reset button labels (may have been swapped by tribute modal)
  const emailBtn = overlay.querySelector('.modal-actions .btn-primary');
  const smsBtn   = overlay.querySelector('.modal-actions .btn-dark');
  if (emailBtn) { emailBtn.textContent = '📧 Send via Email'; emailBtn.onclick = forwardViaEmail; }
  if (smsBtn)   { smsBtn.textContent   = '💬 Send via Text';  smsBtn.onclick   = forwardViaSMS;  }

  overlay.classList.add('active');
}

function hideForwardModal() {
  document.getElementById('forwardModal').classList.remove('active');
}

// ── TRIBUTE MODAL (Fallen Warriors) ───────────────
function showTributeModal(name) {
  const subject = `In Memory of ${name} – Mohonasen Class of '96`;
  const body = `We are saddened to share that our classmate ${name} is no longer with us.

We honor their memory at our 30-Year Reunion.

📅 Friday, July 31, 2026 at 6:00 PM
📍 Katie O'Byrnes Irish Pub, Schenectady, NY

If you have memories or photos of ${name} you'd like to share as a tribute, please reach out to Gina Marx Pereira or Sue Patka Lupia.

Forever a Warrior. 🧡🖤`;

  currentForwardName    = name;
  currentForwardMissing = false;
  const overlay  = document.getElementById('forwardModal');
  document.getElementById('modalName').textContent = `🌹 ${name}`;
  document.getElementById('modalDesc').textContent = 'Share this tribute with classmates, or send memories to the reunion committee.';
  document.getElementById('modalPreview').textContent = body;
  overlay.classList.add('active');

  // swap button labels for tribute context
  const emailBtn = overlay.querySelector('.modal-actions .btn-primary');
  const smsBtn   = overlay.querySelector('.modal-actions .btn-dark');
  if (emailBtn) { emailBtn.textContent = '📧 Share Tribute via Email'; emailBtn.onclick = () => { window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self'); hideForwardModal(); }; }
  if (smsBtn)   { smsBtn.textContent   = '💬 Share via Text';          smsBtn.onclick   = () => { window.open(`sms:?&body=${encodeURIComponent(body)}`); hideForwardModal(); }; }
}

function openLink(url) {
  const a = document.createElement('a');
  a.href = url;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function forwardViaEmail() {
  const name = currentForwardName;
  const isMissing = currentForwardMissing;
  const subject = isMissing
    ? `Help find ${name} – Mohonasen Class of '96 Reunion`
    : `${name} – Mohonasen Class of '96 Reunion Info`;
  const body = buildForwardMessage(name, isMissing);
  openLink(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  hideForwardModal();
}

function forwardViaSMS() {
  const body = buildForwardMessage(currentForwardName, currentForwardMissing);
  openLink(`sms:?&body=${encodeURIComponent(body)}`);
  hideForwardModal();
}

function copyMessage() {
  const body = document.getElementById('modalPreview').textContent;
  navigator.clipboard.writeText(body).then(() => showToast('Message copied to clipboard!'));
}

// ── TOAST ──────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── COUNTDOWN ──────────────────────────────────────
function initCountdown() {
  function tick() {
    const now = new Date();
    const diff = REUNION_DATE - now;
    if (diff <= 0) {
      document.getElementById('days').textContent    = '00';
      document.getElementById('hours').textContent   = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('days').textContent    = String(d).padStart(3, '0');
    document.getElementById('hours').textContent   = String(h).padStart(2, '0');
    document.getElementById('minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('seconds').textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
}

// ── RENDER CLASSMATES ──────────────────────────────
let currentFilter = 'all';
let currentSearch = '';

function getInitials(first, last) {
  return ((first[0] || '') + (last[0] || '')).toUpperCase();
}

function createClassmateCard(c) {
  const isMissing = c.status === 'missing';
  const isFallen  = c.status === 'fallen';

  const cardClass = isFallen  ? 'classmate-card fallen'
                  : isMissing ? 'classmate-card missing'
                  : 'classmate-card';

  // Only show badge for missing and fallen — not portrait
  let badgeHtml = '';
  if (isFallen) {
    badgeHtml = `<span class="status-badge badge-fallen"><img src="yellow-rose.png" class="rose-icon" alt="🌹"> Fallen Warrior</span>`;
  } else if (isMissing) {
    badgeHtml = `<span class="status-badge badge-missing">⚠ Warriors MIA</span>`;
  }

  let avatarStyle = '';
  if (isFallen)  avatarStyle = 'background:linear-gradient(135deg,#3A3A2A,#1A1A10);border:2px solid #8B7355;';
  if (isMissing) avatarStyle = 'background:linear-gradient(135deg,#E53E3E,#C53030);';

  // Profile data
  const profile = getProfile(c.id);
  let profilePreviewHtml = '';
  let profileBtnHtml = '';
  if (!isFallen) {
    if (profile) {
      const bits = [];
      if (profile.currentLast) bits.push(`<div class="pp-item"><span class="pp-label">Now:</span><span>${c.first} ${profile.currentLast}</span></div>`);
      if (profile.spouse)      bits.push(`<div class="pp-item"><span class="pp-label">Partner:</span><span>${profile.spouse}</span></div>`);
      if (profile.career)      bits.push(`<div class="pp-item"><span class="pp-label">Career:</span><span>${profile.career}</span></div>`);
      if (bits.length > 0) profilePreviewHtml = `<div class="card-profile-preview">${bits.join('')}</div>`;
    }
    const btnLabel = profile ? '✏️ Edit My Info' : '＋ Add My Info';
    profileBtnHtml = `<button class="btn-profile${profile ? ' has-profile' : ''}"
      onclick="openProfileModal(${c.id}, '${c.full.replace(/'/g,"\'")}')">
      ${btnLabel}
    </button>`;
  }

  // Display current/married name — profile data takes precedence over hardcoded married field
  let nameSubHtml = '';
  const currentLast = (profile && profile.currentLast) || c.married || null;
  if (currentLast) {
    nameSubHtml = `<div class="card-maiden">Now: ${c.first} ${currentLast}</div>`;
  }

  let emailHtml = '';
  if (isFallen) {
    emailHtml = `
      <div class="card-email fallen-memorial">
        <span class="email-icon"><img src="yellow-rose.png" class="rose-icon" alt="🌹"></span>
        <span style="color:#C4A96A;font-style:italic;font-size:0.85rem;line-height:1.5;">In Memoriam &mdash;<br>Forever a Warrior</span>
      </div>`;
  } else if (isMissing) {
    emailHtml = `
      <div class="card-email">
        <span class="email-icon">🔍</span>
        <span class="no-email-text urgent">Warrior Missing in Action!</span>
      </div>`;
  } else {
    const preEmail    = c.email ? atob(c.email) : null;
    const storedEmail = getStoredEmail(c.id) || preEmail;
    if (storedEmail) {
      emailHtml = `
        <div class="card-email" style="flex-direction:column;align-items:flex-start;gap:0.35rem;padding:0.6rem 0.75rem;">
          <button class="btn btn-primary btn-xs" style="font-size:0.75rem;" onclick="sendEmailToClassmate(${c.id})">
            📧 Email ${c.first}
          </button>
          <a href="#" class="card-edit-email-link" onclick="openEmailVerifyModal(${c.id}, '${c.full.replace(/'/g,"\\'")}');return false;">
            Edit my email
          </a>
        </div>`;
    } else {
      emailHtml = `
        <div class="card-email" style="padding:0;border:none;background:none;">
          <button class="btn-email-entry" onclick="openEmailModal(${c.id}, '${c.full.replace(/'/g,"\\'")}')">
            📧 Is this you? Submit your email
          </button>
        </div>`;
    }
  }

  let noteHtml = c.note ? `<p class="card-note" style="font-size:0.75rem;color:#856404;background:#fff3cd;border-radius:4px;padding:4px 8px;margin-top:-4px;">💡 ${c.note}</p>` : '';

  let actionsHtml = '';
  if (isFallen) {
    actionsHtml = `
      <div class="card-actions">
        <a class="btn btn-fallen-share btn-xs"
          href="fallen.html#warrior-${c.id}" style="text-decoration:none;display:inline-block;">
          <img src="yellow-rose.png" class="rose-icon" alt="🌹"> Share a Tribute
        </a>
      </div>`;
  } else {
    const fbUrl = `https://www.facebook.com/search/people/?q=${encodeURIComponent(c.first + ' ' + c.last)}`;
    actionsHtml = `
      <div class="card-actions">
        <span class="card-know-text">Do you know ${c.first}?</span>
        <button class="btn btn-forward btn-xs"
          onclick="showForwardModal('${c.full.replace(/'/g,"\'")}', ${isMissing}, '${c.first.replace(/'/g,"\'")}')">
          📨 Forward them a notification
        </button>
        <a class="btn btn-ghost btn-xs" href="${fbUrl}" target="_blank" rel="noopener"
           style="font-size:0.72rem;text-decoration:none;">📘 Find on Facebook</a>
        ${profileBtnHtml}
      </div>`;
  }

  return `
    <div class="${cardClass}" data-id="${c.id}" data-name="${c.full.toLowerCase()}" data-status="${c.status}">
      <div class="card-header">
        <div class="card-avatar" style="${avatarStyle}">${getInitials(c.first, c.last)}</div>
        <div class="card-name-block">
          <div class="card-name">${c.first} ${c.last}${c.suf ? ' ' + c.suf : ''}</div>
          ${nameSubHtml}
        </div>
        ${badgeHtml}
      </div>
      ${noteHtml}
      ${profilePreviewHtml}
      ${emailHtml}
      ${actionsHtml}
    </div>`;
}

function renderClassmates() {
  const grid = document.getElementById('classmatesGrid');
  if (!grid) return;

  let list = CLASSMATES;

  // filter
  if (currentFilter === 'portrait') list = list.filter(c => c.status === 'portrait');
  if (currentFilter === 'missing')  list = list.filter(c => c.status === 'missing');
  if (currentFilter === 'fallen')   list = list.filter(c => c.status === 'fallen');

  // search
  if (currentSearch.trim()) {
    const q = currentSearch.toLowerCase().trim();
    list = list.filter(c =>
      c.full.toLowerCase().includes(q) ||
      c.first.toLowerCase().includes(q) ||
      c.last.toLowerCase().includes(q)
    );
  }

  // purely alphabetical by last name — status shown via card style/badge
  list = [...list].sort((a, b) => a.last.localeCompare(b.last));

  grid.innerHTML = list.length > 0
    ? list.map(createClassmateCard).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);">No classmates match your search.</div>`;

  const count = document.getElementById('resultsCount');
  if (count) count.textContent = `Showing ${list.length} of ${CLASSMATES.length}`;
}

// ── RENDER SURVEY RESPONDENTS ──────────────────────
function renderSurveyRespondents() {
  const grid = document.getElementById('surveyGrid');
  if (!grid) return;

  const attending = { Yes: '✅ Attending', Maybe: '🤔 Maybe', No: '❌ Not Attending' };
  const attendColors = { Yes: '#276749', Maybe: '#744210', No: '#9B2C2C' };
  const attendBg = { Yes: '#F0FFF4', Maybe: '#FFFBEB', No: '#FFF5F5' };

  grid.innerHTML = SURVEY.map(s => {
    const masked = maskEmail(s.email);
    const maiden = s.maiden ? ` <span style="font-size:0.75rem;color:#888;">(née ${s.maiden})</span>` : '';
    const att = attending[s.attending] || s.attending;
    const attColor = attendColors[s.attending] || '#333';
    const attBg = attendBg[s.attending] || '#eee';
    return `
      <div class="classmate-card" style="border-left:3px solid #9B59B6;">
        <div class="card-header">
          <div class="card-avatar connected-avatar" style="background:linear-gradient(135deg,#6B46C1,#553C9A)">
            ${s.name.trim()[0].toUpperCase()}
          </div>
          <div class="card-name-block">
            <div class="card-name">${s.name}${maiden}</div>
            <div style="margin-top:3px;">
              <span style="font-size:0.72rem;font-weight:700;padding:2px 8px;border-radius:10px;background:${attBg};color:${attColor};">${att}</span>
            </div>
          </div>
          <span class="status-badge badge-surveyed">📋 Survey</span>
        </div>
        <div class="card-email">
          <span class="email-icon">📧</span>
          <span class="email-masked">${masked}</span>
          <button class="btn btn-primary btn-xs" onclick="sendEmail('${s.email}')">Send</button>
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost btn-xs" onclick="showForwardModal('${s.name.replace(/'/g,"\'")}', false)">
            📨 Forward Notification
          </button>
        </div>
      </div>`;
  }).join('');
}

// ── STATS ──────────────────────────────────────────
function updateStats() {
  const total    = CLASSMATES.length;
  const fallen   = CLASSMATES.filter(c => c.status === 'fallen').length;
  const missing  = CLASSMATES.filter(c => c.status === 'missing').length;
  const portrait = CLASSMATES.filter(c => c.status === 'portrait').length;

  document.getElementById('statTotal').textContent    = total;
  document.getElementById('statPortrait').textContent = portrait;
  document.getElementById('statMissing').textContent  = missing;
  document.getElementById('statFallen').textContent   = fallen;

  // keep the missing-count notice in sync (excludes fallen)
  const mc = document.getElementById('missingCount');
  if (mc) mc.textContent = missing;
}

// ── SEARCH & FILTERS ───────────────────────────────
function initFiltersAndSearch() {
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderClassmates();
    });
  });

  // Search
  const searchInput = document.getElementById('classmateSearch');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      currentSearch = e.target.value;
      renderClassmates();
    });
  }
}

// ── NAVIGATION ─────────────────────────────────────
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', e => { e.stopPropagation(); links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
    document.addEventListener('click', e => {
      if (links.classList.contains('open') && !links.contains(e.target) && e.target !== toggle) {
        links.classList.remove('open');
      }
    });
  }

  // Active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

// ── MODAL EVENTS ───────────────────────────────────
function initModal() {
  const overlay = document.getElementById('forwardModal');
  if (!overlay) return;
  overlay.addEventListener('click', e => {
    if (e.target === overlay) hideForwardModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideForwardModal();
  });
}

// ── UPLOAD ZONE ────────────────────────────────────
function initUploadZone() {
  const zone = document.getElementById('uploadZone');
  if (!zone) return;
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.style.borderColor = 'var(--orange)'; });
  zone.addEventListener('dragleave', () => { zone.style.borderColor = ''; });
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.style.borderColor = '';
    showToast('Thank you! Please email scans to the reunion committee via Facebook.');
  });
  zone.addEventListener('click', () => {
    showToast('Please email your scanned yearbook pages to the reunion committee via Facebook.');
  });
}

// ── EMAIL ENTRIES (localStorage) ───────────────────
const EMAILS_KEY = 'mhs96_emails';

function getEmails() {
  try { return JSON.parse(localStorage.getItem(EMAILS_KEY) || '{}'); }
  catch(e) { return {}; }
}

function getStoredEmail(id) {
  return getEmails()[String(id)] || null;
}

let currentEmailId = null;
let currentEmailName = '';

function openEmailModal(id, name) {
  currentEmailId = id;
  currentEmailName = name;
  document.getElementById('emailModalTitle').textContent = '📧 ' + name;
  const input = document.getElementById('emailEntryInput');
  input.value = getStoredEmail(id) || '';
  document.getElementById('emailEntryModal').classList.add('active');
  setTimeout(() => input.focus(), 50);
}

function closeEmailModal() {
  document.getElementById('emailEntryModal').classList.remove('active');
  currentEmailId = null;
}

function submitEmail() {
  const em = document.getElementById('emailEntryInput').value.trim();
  if (!em.includes('@') || !em.includes('.')) {
    showToast('Please enter a valid email address.');
    return;
  }
  const emails = getEmails();
  emails[String(currentEmailId)] = em;
  localStorage.setItem(EMAILS_KEY, JSON.stringify(emails));

  const c = CLASSMATES.find(x => x.id === parseInt(currentEmailId));
  const name = c ? c.full : currentEmailName;
  const subject = encodeURIComponent(`MHS '96 Email Submission — ${name}`);
  const body    = encodeURIComponent(`Email submitted for classmate: ${name}\nEmail: ${em}\nSubmitted: ${new Date().toLocaleDateString()}`);
  try { openLink(`mailto:juliedion1@gmail.com?subject=${subject}&body=${body}`); } catch(e) {}

  closeEmailModal();
  renderClassmates();
  showToast('Email saved! Your card has been updated.');
}

function initEmailModal() {
  const overlay = document.getElementById('emailEntryModal');
  if (!overlay) return;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeEmailModal(); });
  document.getElementById('emailEntryInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitEmail();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeEmailModal();
  });
}

// ── SEND EMAIL (masked) ────────────────────────────
function sendEmailToClassmate(id) {
  const c = CLASSMATES.find(x => x.id === id);
  const email = getStoredEmail(id) || (c && c.email ? atob(c.email) : null);
  if (email) openLink('mailto:' + email);
}

// ── EMAIL VERIFY MODAL ─────────────────────────────
let verifyEmailId   = null;
let verifyEmailName = '';

function maskPlainEmail(em) {
  if (!em) return '';
  const [local, domain] = em.split('@');
  if (!domain) return em;
  const [dname, ...tlds] = domain.split('.');
  const maskedLocal  = local[0]  + '*'.repeat(Math.min(local.length  - 1, 5));
  const maskedDomain = dname[0]  + '*'.repeat(Math.min(dname.length  - 1, 4));
  return `${maskedLocal}@${maskedDomain}.${tlds.join('.')}`;
}

function openEmailVerifyModal(id, name) {
  verifyEmailId   = id;
  verifyEmailName = name;
  document.getElementById('verifyModalTitle').textContent = name;
  document.getElementById('verifyEmailInput').value = '';
  document.getElementById('newEmailInput').value    = '';
  document.getElementById('verifyError').textContent  = '';
  document.getElementById('verifyError2').textContent = '';
  document.getElementById('verifyStep1').style.display = 'block';
  document.getElementById('verifyStep2').style.display = 'none';

  // Show masked hint of the email currently on file
  const c = CLASSMATES.find(x => x.id === id);
  const stored = getStoredEmail(id) || (c && c.email ? atob(c.email) : null);
  const hint = document.getElementById('verifyEmailHint');
  if (hint) {
    if (stored) {
      hint.textContent = `Email on file: ${maskPlainEmail(stored)}`;
      hint.style.display = 'block';
    } else {
      hint.style.display = 'none';
    }
  }

  document.getElementById('emailVerifyModal').classList.add('active');
  setTimeout(() => document.getElementById('verifyEmailInput').focus(), 50);
}

function closeEmailVerifyModal() {
  document.getElementById('emailVerifyModal').classList.remove('active');
  verifyEmailId = null;
}

function verifyOldEmail() {
  const entered = document.getElementById('verifyEmailInput').value.trim().toLowerCase();
  if (!entered) { document.getElementById('verifyError').textContent = 'Please enter your email.'; return; }
  const c      = CLASSMATES.find(x => x.id === verifyEmailId);
  const stored = getStoredEmail(verifyEmailId) || (c && c.email ? atob(c.email) : null);
  if (!stored) {
    document.getElementById('verifyError').textContent = 'No email on file. Use "Submit your email" instead.';
    return;
  }
  if (entered === stored.toLowerCase()) {
    document.getElementById('verifyStep1').style.display = 'none';
    document.getElementById('verifyStep2').style.display = 'block';
    document.getElementById('verifyError').textContent = '';
    setTimeout(() => document.getElementById('newEmailInput').focus(), 50);
  } else {
    document.getElementById('verifyError').textContent = 'Email does not match our records. Please try again.';
  }
}

function submitVerifiedEmail() {
  const newEmail = document.getElementById('newEmailInput').value.trim();
  if (!newEmail.includes('@') || !newEmail.includes('.')) {
    document.getElementById('verifyError2').textContent = 'Please enter a valid email address.';
    return;
  }
  const emails = getEmails();
  emails[String(verifyEmailId)] = newEmail;
  localStorage.setItem(EMAILS_KEY, JSON.stringify(emails));
  const c    = CLASSMATES.find(x => x.id === verifyEmailId);
  const name = c ? c.full : verifyEmailName;
  const subject = encodeURIComponent(`MHS '96 Email Update — ${name}`);
  const body    = encodeURIComponent(`Email updated for: ${name}\nNew email: ${newEmail}\nUpdated: ${new Date().toLocaleDateString()}`);
  window.open(`mailto:juliedion1@gmail.com?subject=${subject}&body=${body}`, '_self');
  closeEmailVerifyModal();
  renderClassmates();
  showToast('Email updated! Check your mail app to notify the committee.');
}

function initEmailVerifyModal() {
  const overlay = document.getElementById('emailVerifyModal');
  if (!overlay) return;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeEmailVerifyModal(); });
  document.getElementById('verifyEmailInput').addEventListener('keydown', e => { if (e.key === 'Enter') verifyOldEmail(); });
  document.getElementById('newEmailInput').addEventListener('keydown',    e => { if (e.key === 'Enter') submitVerifiedEmail(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('active')) closeEmailVerifyModal(); });
}

// ── PROFILES (localStorage) ────────────────────────
const PROFILES_KEY = 'mhs96_profiles';

function getProfiles() {
  try { return JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}'); }
  catch(e) { return {}; }
}

function getProfile(id) {
  return getProfiles()[id] || null;
}

function saveProfileData(id, data) {
  const profiles = getProfiles();
  profiles[id] = data;
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

// ── PROFILE MODAL ───────────────────────────────────
let currentProfileId = null;
let currentProfileName = '';

function openProfileModal(id, name) {
  currentProfileId = id;
  currentProfileName = name;
  document.getElementById('profileModalTitle').textContent = '✏️ ' + name + ' — Update Profile';
  document.getElementById('profileClassmateId').value = id;
  const p = getProfile(id);
  document.getElementById('pfCurrentLast').value = p ? (p.currentLast || '') : '';
  document.getElementById('pfSpouse').value       = p ? (p.spouse      || '') : '';
  document.getElementById('pfChildren').value     = p ? (p.children    || '') : '';
  document.getElementById('pfCareer').value       = p ? (p.career      || '') : '';
  document.getElementById('pfMemory').value       = p ? (p.memory      || '') : '';
  document.getElementById('profileModal').classList.add('active');
}

function closeProfileModal() {
  document.getElementById('profileModal').classList.remove('active');
  currentProfileId = null;
}

function saveProfile() {
  const id = parseInt(currentProfileId);
  if (!id) return;
  const data = {
    currentLast: document.getElementById('pfCurrentLast').value.trim(),
    spouse:      document.getElementById('pfSpouse').value.trim(),
    children:    document.getElementById('pfChildren').value.trim(),
    career:      document.getElementById('pfCareer').value.trim(),
    memory:      document.getElementById('pfMemory').value.trim(),
    updated:     new Date().toISOString()
  };
  saveProfileData(id, data);

  const c = CLASSMATES.find(x => x.id === id);
  const name = c ? c.full : currentProfileName;
  const lines = [
    `Profile update submitted for: ${name} (ID: ${id})`,
    '',
    data.currentLast ? `Current/Married Name: ${(c ? c.first : '') + ' ' + data.currentLast}` : null,
    data.spouse      ? `Spouse/Partner: ${data.spouse}` : null,
    data.children    ? `Children: ${data.children}` : null,
    data.career      ? `Career: ${data.career}` : null,
    data.memory      ? `Favorite Memory:\n${data.memory}` : null,
    '',
    `Submitted: ${new Date().toLocaleDateString()}`
  ].filter(l => l !== null);

  const subject = encodeURIComponent(`MHS '96 Profile Update — ${name}`);
  const body    = encodeURIComponent(lines.join('\n'));
  window.open(`mailto:juliedion1@gmail.com?subject=${subject}&body=${body}`, '_self');

  closeProfileModal();
  renderClassmates();
  showToast('Profile saved! Check your mail app to send it to the committee.');
}

function initProfileModal() {
  const overlay = document.getElementById('profileModal');
  if (!overlay) return;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeProfileModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('active')) closeProfileModal(); });
}

// ── INIT ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  updateStats();
  renderClassmates();
  initFiltersAndSearch();
  initNav();
  initModal();
  initEmailModal();
  initEmailVerifyModal();
  initProfileModal();
  initTicketForm();
});

// ── TICKET SYSTEM ──────────────────────────────────
function generateConfCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'MHS96-';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function renderAttendeeFields(qty) {
  const container = document.getElementById('attendeeNames');
  if (!container) return;
  const primaryName = document.getElementById('ticketName').value.trim();
  const existing = [];
  container.querySelectorAll('input[data-attendee]').forEach(el => existing.push(el.value));

  let html = `<div style="font-size:0.82rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--dark);margin-bottom:0.25rem;">
    Who is attending? <span style="font-weight:400;text-transform:none;color:var(--text-muted);">(one name per ticket)</span></div>`;
  for (let i = 0; i < qty; i++) {
    const placeholder = i === 0 ? (primaryName || 'Ticket 1 — your name') : `Ticket ${i + 1} — attendee name`;
    const val = existing[i] || (i === 0 && primaryName ? primaryName : '');
    html += `<input type="text" data-attendee="${i}" placeholder="${placeholder}"
      value="${val.replace(/"/g, '&quot;')}"
      style="padding:0.55rem 0.9rem;border:2px solid var(--border);border-radius:8px;font-size:0.9rem;width:100%;transition:border 0.2s;"
      oninput="syncPrimaryName(this, ${i})"
      onfocus="this.style.borderColor='var(--orange)'" onblur="this.style.borderColor='var(--border)'">`;
  }
  container.innerHTML = html;
}

function syncPrimaryName(el, idx) {
  if (idx === 0) {
    const nameInput = document.getElementById('ticketName');
    if (nameInput) nameInput.value = el.value;
  }
}

function getAttendeeNames(qty) {
  const names = [];
  for (let i = 0; i < qty; i++) {
    const el = document.querySelector(`input[data-attendee="${i}"]`);
    names.push(el ? el.value.trim() : '');
  }
  return names;
}

function updateTicketTotal() {
  const qty = Math.max(1, parseInt(document.getElementById('ticketQty').value) || 1);
  document.getElementById('ticketTotal').textContent = (qty * 20).toFixed(2);
  renderAttendeeFields(qty);
}

function adjustTickets(delta) {
  const input = document.getElementById('ticketQty');
  const newVal = Math.max(1, (parseInt(input.value) || 1) + delta);
  input.value = newVal;
  updateTicketTotal();
}

function submitTicketForm(e) {
  e.preventDefault();
  const name  = document.getElementById('ticketName').value.trim();
  const email = document.getElementById('ticketEmail').value.trim();
  const qty   = Math.max(1, parseInt(document.getElementById('ticketQty').value) || 1);
  if (!name)                  { showToast('Please enter your name.'); return; }
  if (!email.includes('@'))   { showToast('Please enter a valid email address.'); return; }
  const attendees = getAttendeeNames(qty);
  if (attendees[0] === '') attendees[0] = name;
  const conf = generateConfCode();
  showTicketModal(name, email, qty, conf, attendees);
}

function buildTicketCard(attendeeName, conf, num, total) {
  return `
    <div class="ticket-card">
      <div class="ticket-band">
        <span>MOHONASEN CLASS OF 1996 · 30-YEAR REUNION</span>
      </div>
      <div class="ticket-body">
        <div class="ticket-school">Mohonasen High School — Class of 1996</div>
        <div class="ticket-title">30-Year Reunion</div>
        <div class="ticket-info">
          <div>📅 Friday, July 31, 2026 &nbsp;·&nbsp; 6:00 PM</div>
          <div>📍 Katie O'Byrnes Irish Pub &nbsp;·&nbsp; Schenectady, NY</div>
          <div>👤 ${attendeeName || 'Guest'}</div>
        </div>
      </div>
      <div class="ticket-stub">
        <div class="stub-num">${num}<span>/ ${total}</span></div>
        <div class="stub-conf">${conf}</div>
        <div class="stub-price">$20</div>
      </div>
    </div>`;
}

function buildTicketEmailBody(name, qty, conf, total, attendees) {
  const attendeeList = attendees && attendees.length
    ? attendees.map((n, i) => `  Ticket ${i+1}: ${n || 'Guest'}`).join('\n')
    : `  ${name}`;
  return `Hi ${name},

Your tickets for the Mohonasen High School Class of 1996 Reunion are confirmed!

CONFIRMATION: ${conf}
Purchased by: ${name}
Tickets: ${qty} x $20 = $${total.toFixed(2)}

ATTENDEES:
${attendeeList}

EVENT:
Friday, July 31, 2026 at 6:00 PM
Katie O'Byrnes Irish Pub
121 Wall Street, State Street & Erie Blvd
Schenectady, NY 12305

Please bring your confirmation number to the event.
Questions? Contact Gina Marx Pereira, Sue Patka Lupia, or Julie Dion (juliedion1@gmail.com).

Go Warriors! Orange and Black!`;
}

function showTicketModal(name, email, qty, conf, attendees) {
  const total = qty * 20;
  attendees = attendees || [name];
  let ticketsHtml = '';
  for (let i = 0; i < qty; i++) ticketsHtml += buildTicketCard(attendees[i] || name, conf, i + 1, qty);
  document.getElementById('ticketCardsContainer').innerHTML = ticketsHtml;
  document.getElementById('tModalConf').textContent  = conf;
  document.getElementById('tModalName').textContent  = name;
  document.getElementById('tModalEmail').textContent = email;
  document.getElementById('tModalQty').textContent   = qty + ' ticket' + (qty > 1 ? 's' : '');
  document.getElementById('tModalTotal').textContent = '$' + total.toFixed(2);

  const subject = `Mohonasen Class of '96 Reunion — ${qty} Ticket${qty > 1 ? 's' : ''} · ${conf}`;
  const body = buildTicketEmailBody(name, qty, conf, total, attendees);
  const emailBtn = document.getElementById('emailTicketsBtn');
  emailBtn.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  document.getElementById('ticketModal').classList.add('active');
}

function closeTicketModal() {
  document.getElementById('ticketModal').classList.remove('active');
}

function printTickets() {
  const content = document.getElementById('ticketCardsContainer').innerHTML;
  const win = window.open('', '_blank', 'width=700,height=600');
  win.document.write(`<!DOCTYPE html><html><head><title>Reunion Tickets</title>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700;900&display=swap" rel="stylesheet">
  <style>
    body{margin:0;padding:24px;background:#fff;font-family:system-ui}
    .ticket-card{display:flex;border:2px solid #F47B20;border-radius:10px;overflow:hidden;margin-bottom:20px;max-width:580px;page-break-inside:avoid}
    .ticket-band{background:#F47B20;color:#fff;width:26px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .ticket-band span{font-family:'Oswald',sans-serif;font-weight:700;font-size:7px;letter-spacing:1px;writing-mode:vertical-rl;transform:rotate(180deg);text-transform:uppercase;white-space:nowrap}
    .ticket-body{flex:1;padding:14px 18px}
    .ticket-school{font-size:9px;text-transform:uppercase;letter-spacing:1.5px;color:#888}
    .ticket-title{font-family:'Oswald',sans-serif;font-size:20px;font-weight:900;color:#1a1a1a;margin:2px 0 8px}
    .ticket-info{font-size:11px;color:#555;display:flex;flex-direction:column;gap:3px}
    .ticket-stub{background:#1a1a1a;color:#fff;width:84px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px 6px;flex-shrink:0;text-align:center;gap:4px}
    .stub-num{font-family:'Oswald',sans-serif;font-size:26px;font-weight:900;color:#F47B20;line-height:1}
    .stub-num span{font-size:11px;display:block;color:rgba(255,255,255,.5)}
    .stub-conf{font-size:7px;color:rgba(255,255,255,.55);letter-spacing:.5px;word-break:break-all}
    .stub-price{font-family:'Oswald',sans-serif;font-size:14px;font-weight:700;color:#F47B20}
    @media print{body{padding:0}}
  </style></head><body>${content}<script>window.onload=()=>window.print()<\/script></body></html>`);
  win.document.close();
}

function initTicketForm() {
  const form = document.getElementById('ticketForm');
  if (form) form.addEventListener('submit', submitTicketForm);
  const qtyInput = document.getElementById('ticketQty');
  if (qtyInput) qtyInput.addEventListener('input', updateTicketTotal);
  // Sync attendee field 0 with name field when user types their name
  const nameInput = document.getElementById('ticketName');
  if (nameInput) nameInput.addEventListener('input', () => {
    const first = document.querySelector('input[data-attendee="0"]');
    if (first && first.value === '') first.placeholder = nameInput.value || 'Ticket 1 — your name';
  });
  const tModal = document.getElementById('ticketModal');
  if (tModal) tModal.addEventListener('click', e => { if (e.target === tModal) closeTicketModal(); });
  // Render initial attendee field
  renderAttendeeFields(1);
}
