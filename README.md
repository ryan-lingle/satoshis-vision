Satoshi's Vision
================
Check out the Lapp @ [toshi.vision](https://www.toshi.vision/)

What is is this?
----------------
Inspired by [Satoshi's Place](https://satoshis.place/), Satoshi's Vision™ is a place where Bitcoiners can put their Sats where their mouth is and make an edit to the sacred text itself, the Bitcoin White-Paper.

The rules are simple: 100 Sats per edited word.

Having delusions of being the one true profit of Satoshi's Vision? Vent it all out here and spare yourself from creating yet another useless Bitcoin fork that will certainly go to zero.

Please nothing too blasphemous. He might be watching...


API
---
It's possible to access the Rails API of this project directly if you were so inclined.

The following will a return a list of hashes mapping ids to words in the current version of the white paper.
```
curl https://www.toshi.vision/api/v1/words
```
Like this (only a lot longer):
```
[
  {"id":3009,"text":"We","edited":true},
  {"id":3010,"text":"propose","edited":true},
  {"id":3011,"text":"a","edited":null},
  {"id":3012,"text":"solution","edited":null},
  {"id":3013,"text":"to","edited":null},
  {"id":3014,"text":"the","edited":null},
  {"id":3015,"text":"double-spending","edited":true},
  {"id":3016,"text":"problem","edited":null}
]
```
From here you can construct a post request including the id's of the words you want to edit
with the new text to replace it with:
```
curl -d \
'edits=[{"id":"3009","text":"Hodlonaut"},{"id":3010,"text":"propses"},{"id":3015,"text":"Craig"}]'\
-X POST https://www.toshi.vision/api/v1/invoice
```
Which will respond with an invoice. Pay the invoice and your edits will be published!
