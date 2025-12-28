---
title: "Persistent Storage"
description: "Allows Apprise to avoid requesting the same data over and over again."
---

# Persistent Storage

Persistent Storage greatly reduces the API transactions between you and the service(s) you may use. Developers need to enable this but the Apprise CLI has this enabled by default.

For things like:

- The Matrix plugin: persistent cache allows login information to be cached locally for re-use (saving extra API calls to authenticate again each time).
- The Telegram plugin: persistent cache allows Apprise to remember your user account saving extra fetches to the service to determine it each and every time.

Aditional Notes:

- Apprise stores all of it's persistent data in it's own directory unique to the Apprise URL you create. By default all directories are 8 characters in length and a combination of letters an numbers.
- All Apprise persistent files have a `.psdata` extension and are written to a cache directory chosen by you otherwise it defaults to the locations provided by your operating system.

## Developer Usage

When developing your plugin, you can access the persistent storage via `self.store`.  There are 2 main features:

- **Key/Value Entries**: This is the easiest as the store behaves very much like a dictionary.  But under the hood it is handling the data based on the operational mode.  For the most part you can set most types (int, float, etc).  Content is flushed to disk using the `json.dumps` call.

   ```python
   # Set a key:
   self.store['keyname'] = 'value'

   # You can also use store.set() which is useful to set additional parameters (such as an
   # expiry time)

   # The 30 is the number of seconds the data is valid for. You can use int/float to set a 
   # time from now.  The default is to not expire.

   # You can also pass in a datetime() object as well if you want to explicitly set a time
   self.store.set('another-key', 'value', 30)

   # Verify if your key is set:
   if 'keyname' in self.store:
       print('Yup, I found it').
   ```

- **Data Files**: You may find yourself wanting to write content straight to disk (all files have a `psdata` extension).

   ```python
   # write data (no key specified, so the value `default` is used)
   # You can pass in a string or bytes object.  Note that when you read the content back it will be bytes
   self.store.write(b'my content I wish to write directly to disk')

   # The below would open up `default.psdata` (which is compressed) and would return what was written above
   content = self.store.read()

   # to store custom keys and have the content not be compressed:
   self.store.write('my-content', key='custom-key', compress=False)

   # The above wrote the content to `custom-key.psdata` in an uncompressed file.
   # This is useful for people who want to place files in advance for the persistent storage
   # to reference.

   # Make sure to read the file back with the same parameters:
   content = self.store.read('custom-key', compress=False)
   ```

   **Note:** Read/write functions work similar to how `read/write` would otherwise work.  If Persistent Storage is disable then `write()` will always return `None`. `read()` however will return content if it's present

Here are more examples

```python

class MyNotification(NotifyBase):
 # ...
 def send(self, body, *args, **kwargs):
       # Value is returned from memory if stored there
       # if not found, and persistent storage is enabled, then the value is read from disk and stored into memory
       # The value is then returned
       # `None` is returned if content does not exist in either location
       value = self.store.get('key')

       # Store key/value pair in memory (and Disk if persistent flag is set)
       self.store.set('key', 'value')

       #
       # Some extra options you can use with the set()
       #

       # Invalidate the data (forcing get() to return None after time is reached)
       self.store.set('key', 'value', expires=datetime(now) + timedelta(hours=1))

       # By default persistent will always be set to True, but perhaps you don't want the content to
       # persist and only exist for the life of the application instead.
       self.store.set('key', 'value', persistent=False)
       
       # Flushes elements to disk if they are configured to persist there; this 
       # never needs to be called directly as the PersistentStore object looks
       # after this automatically.  Those set to `auto` (default) mode can
       # leverage this to force an early write/sync to disk
       self.store.flush()

       # The following would both flush the key from memory and persistent
       # storage if present.
       self.store.clear('key')

       # Similar to flush, this works as well to provide a focused group clear
       self.store.clear('key1', 'key2', 'key3', ...)

       # Remove all entries in memory and all entries in the persistent store
       self.store.clear()

       # Allow Apprise to persist files outside of key/value pairs as well.  Such as maybe
       # an initial online registration that occurs and it needs to store a private/public
       # key.
       with self.store.open("key", "wb") as fp:
           fp.write()

       with self.store.open("key", "rb") as fp:
           content = fp.read()

       # To remove all persistent key/value pairs in cache you can do the following
       self.store.clear()

       # The above is a clear all command: If you only wish to clear specific keys:
       self.store.clear('key1', 'key2')

       # For consistency with the rest of the above logic:, this would clear a file
       # by it's key with delete() instead of 'clear().
       self.store.delete('key')

       # multiple keys can be cleared if required
       self.store.delete('key1', 'key2', 'key3')

```
