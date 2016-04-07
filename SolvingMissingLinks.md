# What are missing links? #

Missing links are files or elements in files that are referred to, but is not part of a production. They emerge when:
  * using an absolute path in the production.
  * refer to files what are not part of the production.
  * rename or move or delete a file without the usage of re-factoring
  * rename, delete an element without the usage of re-factoring

# Solving missing links #

It should be possible to help you solving missing links. When solving you have to make a choice. the application will help you make the choice.

## Solve blend to blend missing link ##
When a blend file refers to another blend file it has more information inside to detect what blend file is possible to refer to.
EG. blend file A uses blend file B for the elements GRc and MEd.

1. find blend files with the elements GRc and MEd.
2. find all other blend files.

This list can be large. so a filter is handy It should also be clear which files do match the needed elements and which files do not. matches will be shown first in the list of options

## Solve blend to image missing link ##
When a blend file refers to an image file. we only have a file-name.
The selection of possible options will be ordered by what is best expected

1. find files with the same file-name but on a different location
2. find files with the same extension
3. find all other image files.

This list can be large. so a filter is handy

# Re-factoring #
When a file has been selected the re-factoring process will be started.

# Technical design #
## presentation layer ##
## logic layer ##
## database layer ##

select all files who matches the aspect closely

```
select element.name from element where library_id=? and type='ID'
```
the result of this query has to integrated with the next query meaning the /3.0 will be replaced by the floating representation of the rowcount and the list of objectnames are the concat of the result.
```
select file.*, count(*)/3.0 from element el, file where file.id=el.file_id and el.type<>'BF' and el.name in ('OB1', 'OB2', 'OB3') and file.production_id=1 group by el.blendfile_id order by count(*) desc, file.location;
```

results into:
| **file.id** | **production.id** | **file.name** | **file.location** | **file.timestamp** | **file.size** | **percentage match** |
|:------------|:------------------|:--------------|:------------------|:-------------------|:--------------|:---------------------|
|13           |1                  |fuzz\_font.blend|menus/fuzz\_font.blend|1228589776          |68247          |1.0                   |
|51           |1                  |frankie.blend  |chars/frankie.blend|1246857967          |412706         |0.666666666666667     |
|2            |1                  |bumblebee.blend|franci\_test/bumblebee.blend|1239435940          |248730         |0.666666666666667     |

file 13 is a 100% match 3/3
file 2 and 51 are a 66% match 2/3
files with 0% match will not be shown

TODO: only use the parameter of the LI what really is missing in stead of the list of objects. perhaps 2 sql statements