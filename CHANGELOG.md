# [0.9.0](https://github.com/bscotch/mpath/compare/0.8.3...0.9.0) (2021-03-25)


### Bug Fixes

* Many tests are failing after porting. ([35f5cc2](https://github.com/bscotch/mpath/commit/35f5cc2491a77baf5ecd16fb40b35fd2335e9f19))


### Features

* Port to Typescript and ESM. ([76399e1](https://github.com/bscotch/mpath/commit/76399e1a188db1818abe5d16e56810d577dd493f))



## [0.8.3](https://github.com/bscotch/mpath/compare/0.8.2...0.8.3) (2020-12-30)


### Bug Fixes

* use var instead of let/const for Node.js 4.x support ([f050c3a](https://github.com/bscotch/mpath/commit/f050c3ab5b4c0ab46ee7254a0d79c2acce53109b))



## [0.8.2](https://github.com/bscotch/mpath/compare/0.8.1...0.8.2) (2020-12-30)


### Bug Fixes

* **stringToParts:** fall back to legacy treatment for square brackets if square brackets contents aren't a number ([ffed519](https://github.com/bscotch/mpath/commit/ffed5197e598df2b6a3312d09fe09b7a66c4de82)), closes [Automattic/mongoose#9640](https://github.com/Automattic/mongoose/issues/9640)



## [0.8.1](https://github.com/bscotch/mpath/compare/0.8.0...0.8.1) (2020-12-10)


### Bug Fixes

* **stringToParts:** handle empty string and trailing dot the same way that `split()` does for backwards compat ([c507d2c](https://github.com/bscotch/mpath/commit/c507d2c8e6cc20c1b67f2645e868f6d4dd521247)), closes [Automattic/mongoose#9681](https://github.com/Automattic/mongoose/issues/9681)



# [0.8.0](https://github.com/bscotch/mpath/compare/0.7.0...0.8.0) (2020-11-14)


### Features

* support square bracket indexing for `get()`, `set()`, `has()`, and `unset()` ([b9ec839](https://github.com/bscotch/mpath/commit/b9ec839743b9ab5dc86d663f929b37d46fbe572e)), closes [Automattic/mongoose#9375](https://github.com/Automattic/mongoose/issues/9375)



# [0.7.0](https://github.com/bscotch/mpath/compare/0.6.0...0.7.0) (2020-03-24)



# [0.6.0](https://github.com/bscotch/mpath/compare/0.5.2...0.6.0) (2019-05-01)


### Features

* support setting dotted paths within nested arrays ([522a16c](https://github.com/bscotch/mpath/commit/522a16c0c96cfbfa15463443cf7962f0647cfd52)), closes [Automattic/mongoose#7647](https://github.com/Automattic/mongoose/issues/7647)



## [0.5.2](https://github.com/bscotch/mpath/compare/0.5.1...0.5.2) (2019-04-25)


### Bug Fixes

* avoid using subclassed array constructor when doing `map()` ([ff4cd66](https://github.com/bscotch/mpath/commit/ff4cd6628d854853949950e619c5d6a5097694e4)), closes [Automattic/mongoose#7700](https://github.com/Automattic/mongoose/issues/7700)



## [0.5.1](https://github.com/bscotch/mpath/compare/0.5.0...0.5.1) (2018-08-30)


### Bug Fixes

* prevent writing to constructor and prototype as well ([fe732eb](https://github.com/bscotch/mpath/commit/fe732eb05adebe29d1d741bdf3981afbae8ea94d))



# [0.5.0](https://github.com/bscotch/mpath/compare/0.4.1...0.5.0) (2018-08-30)



## [0.4.1](https://github.com/bscotch/mpath/compare/0.3.0...0.4.1) (2018-04-08)


### Bug Fixes

* allow opting out of weird `$` set behavior ([7950b82](https://github.com/bscotch/mpath/commit/7950b8232386c3e660b9926e67eb2b27e5c8eff9)), closes [Automattic/mongoose#6273](https://github.com/Automattic/mongoose/issues/6273)


### Features

* add rudimentary support for maps ([744b3c8](https://github.com/bscotch/mpath/commit/744b3c8de1d4225d78b25adacb5c8f0d592dd343)), closes [Automattic/mongoose#681](https://github.com/Automattic/mongoose/issues/681)



# [0.3.0](https://github.com/bscotch/mpath/compare/0.2.1...0.3.0) (2017-06-05)


### Features

* add has() and unset() ([cb8b732](https://github.com/bscotch/mpath/commit/cb8b732c96525c931495feb00cdf0ccced6384d0))



## [0.2.1](https://github.com/bscotch/mpath/compare/0.2.0...0.2.1) (2013-03-22)



# [0.2.0](https://github.com/bscotch/mpath/compare/0.1.1...0.2.0) (2013-03-15)



## [0.1.1](https://github.com/bscotch/mpath/compare/0.1.0...0.1.1) (2012-12-21)



# [0.1.0](https://github.com/bscotch/mpath/compare/0.0.1...0.1.0) (2012-12-13)



## 0.0.1 (2012-11-03)



