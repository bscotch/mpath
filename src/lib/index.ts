import stringToParts from './stringToParts.js';

// These properties are special and can open client libraries to security
// issues
var ignoreProperties = ['__proto__', 'constructor', 'prototype'];

type Path = string | string[];
export type Container = { [key in string | number]: any };
export type Lookup = (
  obj: Container,
  key: keyof Container,
  newValue?: any,
) => any;
export type Special = string | Lookup;
export type MapFunction = (value: any) => any;

/**
 * Returns the value of object `o` at the given `path`.
 *
 * #### Example:
 *
 *     var obj = {
 *         comments: [
 *             { title: 'exciting!', _doc: { title: 'great!' }}
 *           , { title: 'number dos' }
 *         ]
 *     }
 *
 *     mpath.get('comments.0.title', o)         // 'exciting!'
 *     mpath.get('comments.0.title', o, '_doc') // 'great!'
 *     mpath.get('comments.title', o)           // ['exciting!', 'number dos']
 *
 *     // summary
 *     mpath.get(path, o)
 *     mpath.get(path, o, special)
 *     mpath.get(path, o, map)
 *     mpath.get(path, o, special, map)
 *
 * @param path Mongo-style path
 * @param o The object to find the path in
 * @param special When this property name is present on any object in the path, walking will continue on the value of this property.
 * @param map Optional function which receives each individual found value. The value returned from `map` is used in the original values place.
 */

export function get(
  path: Path,
  o: Container,
  special?: Special,
  map?: MapFunction,
): any;
export function get(path: Path, o: Container, map?: MapFunction): any;
export function get(
  path: Path,
  o: any,
  specialOrMap?: Special | MapFunction,
  map?: MapFunction,
) {
  let lookup: Lookup | undefined;
  let special: string | undefined;

  if ('function' == typeof specialOrMap) {
    if (specialOrMap.length < 2) {
      map = specialOrMap as MapFunction;
    } else {
      lookup = specialOrMap;
    }
  } else {
    special = specialOrMap;
  }

  map = map || identity;

  const pathParts = 'string' == typeof path ? stringToParts(path) : path;

  if (!Array.isArray(pathParts)) {
    throw new TypeError('Invalid `path`. Must be either string or array');
  }

  let obj = o;
  for (let i = 0; i < pathParts.length; ++i) {
    const part = pathParts[i];

    if (Array.isArray(obj) && !/^\d+$/.test(part)) {
      // reading a property from the array items
      var paths = pathParts.slice(i);

      // Need to `concat()` to avoid `map()` calling a constructor of an array
      // subclass
      return ([] as any[]).concat(obj).map(function (item) {
        return item
          ? get(paths, item, special || lookup, map)
          : map!(undefined);
      });
    }

    if (lookup) {
      obj = lookup(obj, part);
    } else {
      var _from = special && obj[special] ? obj[special] : obj;
      obj = _from instanceof Map ? _from.get(part) : _from[part];
    }

    if (!obj) return map(obj);
  }

  return map(obj);
}

/**
 * Returns true if `in` returns true for every piece of the path
 */

export function has(path: string, o: any) {
  var parts = typeof path === 'string' ? stringToParts(path) : path;

  if (!Array.isArray(parts)) {
    throw new TypeError('Invalid `path`. Must be either string or array');
  }

  var len = parts.length;
  var cur = o;
  for (var i = 0; i < len; ++i) {
    if (cur == null || typeof cur !== 'object' || !(parts[i] in cur)) {
      return false;
    }
    cur = cur[parts[i]];
  }

  return true;
}

/**
 * Deletes the last piece of `path`
 */

export function unset(path: string, o: any) {
  var parts = typeof path === 'string' ? stringToParts(path) : path;

  if (!Array.isArray(parts)) {
    throw new TypeError('Invalid `path`. Must be either string or array');
  }

  var len = parts.length;
  var cur = o;
  for (var i = 0; i < len; ++i) {
    if (cur == null || typeof cur !== 'object' || !(parts[i] in cur)) {
      return false;
    }
    // Disallow any updates to __proto__ or special properties.
    if (ignoreProperties.indexOf(parts[i]) !== -1) {
      return false;
    }
    if (i === len - 1) {
      delete cur[parts[i]];
      return true;
    }
    cur = cur instanceof Map ? cur.get(parts[i]) : cur[parts[i]];
  }

  return true;
}

/**
 * Sets the `val` at the given `path` of object `o`.
 *
 * @param special When this property name is present on any object in the path, walking will continue on the value of this property.
 * @param map Optional function which is passed each individual value before setting it. The value returned from `map` is used in the original values place.
 */
export function set(
  path: Path,
  val: any,
  o: Container,
  special?: Special,
  map?: MapFunction,
  _copying?: boolean,
): any;
export function set(path: Path, val: any, o: Container, map?: MapFunction): any;
export function set(
  path: Path,
  val: any,
  o: Container,
  specialOrMap?: Special | MapFunction,
  map?: MapFunction,
  _copying?: boolean,
) {
  let lookup: Lookup | undefined;
  let special: string | undefined;

  if ('function' == typeof specialOrMap) {
    if (specialOrMap.length < 2) {
      map = specialOrMap as MapFunction;
    } else {
      lookup = specialOrMap;
    }
  } else {
    special = specialOrMap;
  }

  map || (map = identity);

  var parts = 'string' == typeof path ? stringToParts(path) : path;

  if (!Array.isArray(parts)) {
    throw new TypeError('Invalid `path`. Must be either string or array');
  }

  if (null == o) return;

  for (var i = 0; i < parts.length; ++i) {
    // Silently ignore any updates to `__proto__`, these are potentially
    // dangerous if using mpath with unsanitized data.
    if (ignoreProperties.indexOf(parts[i]) !== -1) {
      return;
    }
  }

  // the existance of $ in a path tells us if the user desires
  // the copying of an array instead of setting each value of
  // the array to the one by one to matching positions of the
  // current array. Unless the user explicitly opted out by passing
  // false, see Automattic/mongoose#6273
  const copy =
    _copying ||
    (typeof path == 'string' && /\$/.test(path) && _copying !== false);
  let obj = o;
  let part;

  for (var i = 0, len = parts.length - 1; i < len; ++i) {
    part = parts[i];

    if ('$' == part) {
      if (i == len - 1) {
        break;
      } else {
        continue;
      }
    }

    if (Array.isArray(obj) && !/^\d+$/.test(part)) {
      var paths = parts.slice(i);
      if (!copy && Array.isArray(val)) {
        for (var j = 0; j < obj.length && j < val.length; ++j) {
          // assignment of single values of array
          set(paths, val[j], obj[j], special || lookup, map, copy);
        }
      } else {
        for (var j = 0; j < obj.length; ++j) {
          // assignment of entire value
          set(paths, val, obj[j], special || lookup, map, copy);
        }
      }
      return;
    }

    if (lookup) {
      obj = lookup(obj, part);
    } else {
      const _to = special && obj[special] ? obj[special] : obj;
      obj = _to instanceof Map ? _to.get(part) : _to[part];
    }

    if (!obj) return;
  }

  // process the last property of the path

  part = parts[len];

  // use the special property if exists
  if (special && obj[special]) {
    obj = obj[special];
  }

  // set the value on the last branch
  if (Array.isArray(obj) && !/^\d+$/.test(part)) {
    if (!copy && Array.isArray(val)) {
      _setArray(obj, val, part, lookup, special, map);
    } else {
      for (let j = 0; j < obj.length; ++j) {
        let item = obj[j];
        if (item) {
          if (lookup) {
            lookup(item, part, map(val));
          } else {
            if (item[special as string]) {
              item = item[special as string];
            }
            if (typeof item == 'object') {
              item[part] = map(val);
            }
          }
        }
      }
    }
  } else {
    if (lookup) {
      lookup(obj, part, map(val));
    } else if (obj instanceof Map) {
      obj.set(part, map(val));
    } else if (typeof obj == 'object') {
      obj[part] = map(val);
    }
  }
}

/*!
 * Recursively set nested arrays
 */
function _setArray(
  obj: Container,
  val: any,
  part: string,
  lookup?: Lookup,
  special?: string,
  map?: MapFunction,
) {
  for (let item, j = 0; j < obj.length && j < val.length; ++j) {
    item = obj[j];
    if (Array.isArray(item) && Array.isArray(val[j])) {
      _setArray(item, val[j], part, lookup, special, map);
    } else if (item) {
      if (lookup) {
        lookup(item, part, map?.(val[j]));
      } else {
        if (item[special as string]) item = item[special as string];
        if (typeof item == 'object') {
          item[part] = map?.(val[j]);
        }
      }
    }
  }
}

/**
 * Returns the value passed to it.
 */
function identity<Value>(v: Value): Value {
  return v;
}
