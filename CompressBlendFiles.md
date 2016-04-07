There are 3 kind of blend files.
  1. uncompressed blend files
  1. compressed blend files
  1. packed blend files.

compressed blend files are GZ variants of the uncompressed version. These files are commonly used to reduce needed space for Source control.

Within blender you can change this by File ==> Compressed

# Compress files #
This feature will find all not compressed blend files
and make tasks to compress them

# Functional questions #
## Is there somewhere inside the blender data model a place where this is administered? ##
when compressing a blend file by hand, the file is read correctly, but in the menu the file is not marked as compressed. I assume that somewhere in the model, an attribute tells blender if the file was originally compressed.
  1. start blender
  1. save blend file
  1. tar blend file (tar file.blend)
  1. rename blend file (mv file.blend.gz file.compressed.blend)
  1. open blend file with blender
  1. menu --> file --> Compressed = false (should be true)

next part to inspect:

```
FileGlobal --> fileflags & G_FILE_COMPRESS

./blender/blenkernel/.svn/text-base/BKE_global.h.svn-base:#define G_FILE_COMPRESS          (1 << 1)
./blender/blenkernel/BKE_global.h:#define G_FILE_COMPRESS          (1 << 1)
./blender/blenloader/intern/writefile.c:		if(write_flags & G_FILE_COMPRESS)
```

# Impact #
  * blendfile.py ==> add write int method
  * production.html ==> add UI to start compression
  * servicerefactoring.py ==> add logic to do the refactoring
  * server.py ==> add referrer
  * indexer.py ==> selector to find all uncompressed files and index by FileGlobal.fileflags
  * func.js ==> service handling
  * update user manual
  * update web site
  * create testcase