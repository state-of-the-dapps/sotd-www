<template>
  <div>
    <div>
      <h2
        id="categories-per-month"
        class="heading-2">{{ $t(namespace('title')) }}</h2>
    </div>
    <div class="wrapper">
      <div class="wrapper-inner">
        <canvas id="categories-per-month-chart"/>
      </div>
    </div>
  </div>
</template>

<script>
const rawData = [
  {
    month: '2018-01',
    category: 'high-risk',
    transactions: 1,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2018-01',
    category: 'insurance',
    transactions: 1243,
    activeUsers: 380,
    volume: 0
  },
  {
    month: '2018-01',
    category: 'property',
    transactions: 13913,
    activeUsers: 3901,
    volume: 476
  },
  {
    month: '2018-01',
    category: 'social',
    transactions: 12920,
    activeUsers: 4438,
    volume: 22
  },
  {
    month: '2018-01',
    category: 'health',
    transactions: 4,
    activeUsers: 2,
    volume: 0
  },
  {
    month: '2018-01',
    category: 'finance',
    transactions: 130606,
    activeUsers: 38136,
    volume: 11324
  },
  {
    month: '2018-01',
    category: 'security',
    transactions: 99424,
    activeUsers: 17423,
    volume: 47
  },
  {
    month: '2018-01',
    category: 'identity',
    transactions: 10312,
    activeUsers: 1918,
    volume: 218
  },
  {
    month: '2018-01',
    category: 'energy',
    transactions: 3160,
    activeUsers: 2272,
    volume: 3236
  },
  {
    month: '2018-01',
    category: 'wallet',
    transactions: 1262908,
    activeUsers: 165329,
    volume: 282297
  },
  {
    month: '2018-01',
    category: 'exchanges',
    transactions: 799028,
    activeUsers: 112187,
    volume: 259511
  },
  {
    month: '2018-01',
    category: 'development',
    transactions: 71963,
    activeUsers: 25919,
    volume: 7
  },
  {
    month: '2018-01',
    category: 'storage',
    transactions: 11696,
    activeUsers: 2404,
    volume: 0
  },
  {
    month: '2018-01',
    category: 'gambling',
    transactions: 32092,
    activeUsers: 7869,
    volume: 651
  },
  {
    month: '2018-01',
    category: 'media',
    transactions: 21290,
    activeUsers: 10627,
    volume: 5
  },
  {
    month: '2018-01',
    category: 'governance',
    transactions: 38974,
    activeUsers: 11949,
    volume: 5
  },
  {
    month: '2018-01',
    category: 'games',
    transactions: 270344,
    activeUsers: 27154,
    volume: 2873
  },
  {
    month: '2018-02',
    category: 'health',
    transactions: 2,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2018-02',
    category: 'social',
    transactions: 534,
    activeUsers: 310,
    volume: 1
  },
  {
    month: '2018-02',
    category: 'property',
    transactions: 2463,
    activeUsers: 207,
    volume: 1159
  },
  {
    month: '2018-02',
    category: 'gambling',
    transactions: 9769,
    activeUsers: 2135,
    volume: 1372
  },
  {
    month: '2018-02',
    category: 'wallet',
    transactions: 840232,
    activeUsers: 95207,
    volume: 142228
  },
  {
    month: '2018-02',
    category: 'storage',
    transactions: 7407,
    activeUsers: 1166,
    volume: 0
  },
  {
    month: '2018-02',
    category: 'finance',
    transactions: 24688,
    activeUsers: 7381,
    volume: 17
  },
  {
    month: '2018-02',
    category: 'exchanges',
    transactions: 448620,
    activeUsers: 49635,
    volume: 152143
  },
  {
    month: '2018-02',
    category: 'security',
    transactions: 12038,
    activeUsers: 3898,
    volume: 4
  },
  {
    month: '2018-02',
    category: 'games',
    transactions: 422142,
    activeUsers: 14651,
    volume: 92938
  },
  {
    month: '2018-02',
    category: 'governance',
    transactions: 11744,
    activeUsers: 3171,
    volume: 0
  },
  {
    month: '2018-02',
    category: 'identity',
    transactions: 15783,
    activeUsers: 1964,
    volume: 248
  },
  {
    month: '2018-02',
    category: 'development',
    transactions: 7426,
    activeUsers: 2196,
    volume: 0
  },
  {
    month: '2018-02',
    category: 'energy',
    transactions: 1,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2018-02',
    category: 'media',
    transactions: 6042,
    activeUsers: 1965,
    volume: 175
  },
  {
    month: '2018-03',
    category: 'media',
    transactions: 4845,
    activeUsers: 1540,
    volume: 5
  },
  {
    month: '2018-03',
    category: 'energy',
    transactions: 2,
    activeUsers: 2,
    volume: 0
  },
  {
    month: '2018-03',
    category: 'exchanges',
    transactions: 641370,
    activeUsers: 58083,
    volume: 221329
  },
  {
    month: '2018-03',
    category: 'games',
    transactions: 494472,
    activeUsers: 13373,
    volume: 7539
  },
  {
    month: '2018-03',
    category: 'development',
    transactions: 5696,
    activeUsers: 1770,
    volume: 0
  },
  {
    month: '2018-03',
    category: 'gambling',
    transactions: 46214,
    activeUsers: 5570,
    volume: 12919
  },
  {
    month: '2018-03',
    category: 'health',
    transactions: 1,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2018-03',
    category: 'social',
    transactions: 1000,
    activeUsers: 300,
    volume: 2
  },
  {
    month: '2018-03',
    category: 'wallet',
    transactions: 515067,
    activeUsers: 62319,
    volume: 79709
  },
  {
    month: '2018-03',
    category: 'identity',
    transactions: 25781,
    activeUsers: 1643,
    volume: 327
  },
  {
    month: '2018-03',
    category: 'governance',
    transactions: 4615,
    activeUsers: 2252,
    volume: 0
  },
  {
    month: '2018-03',
    category: 'security',
    transactions: 12314,
    activeUsers: 6440,
    volume: 6
  },
  {
    month: '2018-03',
    category: 'finance',
    transactions: 14884,
    activeUsers: 5823,
    volume: 16
  },
  {
    month: '2018-03',
    category: 'storage',
    transactions: 13892,
    activeUsers: 1103,
    volume: 0
  },
  {
    month: '2018-03',
    category: 'property',
    transactions: 4343,
    activeUsers: 794,
    volume: 4233
  },
  {
    month: '2018-04',
    category: 'property',
    transactions: 5241,
    activeUsers: 403,
    volume: 423
  },
  {
    month: '2018-04',
    category: 'social',
    transactions: 646,
    activeUsers: 305,
    volume: 0
  },
  {
    month: '2018-04',
    category: 'development',
    transactions: 6314,
    activeUsers: 2471,
    volume: 2
  },
  {
    month: '2018-04',
    category: 'governance',
    transactions: 9914,
    activeUsers: 2566,
    volume: 7
  },
  {
    month: '2018-04',
    category: 'games',
    transactions: 615098,
    activeUsers: 17887,
    volume: 6628
  },
  {
    month: '2018-04',
    category: 'wallet',
    transactions: 495542,
    activeUsers: 75588,
    volume: 77231
  },
  {
    month: '2018-04',
    category: 'exchanges',
    transactions: 681844,
    activeUsers: 60970,
    volume: 295569
  },
  {
    month: '2018-04',
    category: 'gambling',
    transactions: 179337,
    activeUsers: 11324,
    volume: 26711
  },
  {
    month: '2018-04',
    category: 'storage',
    transactions: 13695,
    activeUsers: 1011,
    volume: 1
  },
  {
    month: '2018-04',
    category: 'finance',
    transactions: 22008,
    activeUsers: 7008,
    volume: 589
  },
  {
    month: '2018-04',
    category: 'security',
    transactions: 11376,
    activeUsers: 4767,
    volume: 16
  },
  {
    month: '2018-04',
    category: 'media',
    transactions: 14400,
    activeUsers: 3103,
    volume: 49
  },
  {
    month: '2018-04',
    category: 'identity',
    transactions: 30309,
    activeUsers: 1376,
    volume: 196
  },
  {
    month: '2018-05',
    category: 'energy',
    transactions: 18,
    activeUsers: 10,
    volume: 0
  },
  {
    month: '2018-05',
    category: 'property',
    transactions: 2486,
    activeUsers: 193,
    volume: 31
  },
  {
    month: '2018-05',
    category: 'social',
    transactions: 2224,
    activeUsers: 679,
    volume: 60
  },
  {
    month: '2018-05',
    category: 'gambling',
    transactions: 45415,
    activeUsers: 6558,
    volume: 7307
  },
  {
    month: '2018-05',
    category: 'governance',
    transactions: 10411,
    activeUsers: 3048,
    volume: 2
  },
  {
    month: '2018-05',
    category: 'finance',
    transactions: 78532,
    activeUsers: 17001,
    volume: 46877
  },
  {
    month: '2018-05',
    category: 'storage',
    transactions: 22774,
    activeUsers: 2088,
    volume: 0
  },
  {
    month: '2018-05',
    category: 'exchanges',
    transactions: 1070414,
    activeUsers: 86404,
    volume: 439677
  },
  {
    month: '2018-05',
    category: 'media',
    transactions: 10588,
    activeUsers: 2141,
    volume: 46
  },
  {
    month: '2018-05',
    category: 'wallet',
    transactions: 436692,
    activeUsers: 65516,
    volume: 103685
  },
  {
    month: '2018-05',
    category: 'security',
    transactions: 183962,
    activeUsers: 2485,
    volume: 11
  },
  {
    month: '2018-05',
    category: 'development',
    transactions: 69392,
    activeUsers: 11986,
    volume: 311
  },
  {
    month: '2018-05',
    category: 'games',
    transactions: 408252,
    activeUsers: 27995,
    volume: 6644
  },
  {
    month: '2018-05',
    category: 'identity',
    transactions: 33078,
    activeUsers: 1625,
    volume: 225
  },
  {
    month: '2018-06',
    category: 'health',
    transactions: 2,
    activeUsers: 2,
    volume: 0
  },
  {
    month: '2018-06',
    category: 'energy',
    transactions: 6,
    activeUsers: 5,
    volume: 0
  },
  {
    month: '2018-06',
    category: 'media',
    transactions: 4615,
    activeUsers: 1343,
    volume: 43
  },
  {
    month: '2018-06',
    category: 'security',
    transactions: 1723,
    activeUsers: 687,
    volume: 4
  },
  {
    month: '2018-06',
    category: 'wallet',
    transactions: 330896,
    activeUsers: 46607,
    volume: 91040
  },
  {
    month: '2018-06',
    category: 'finance',
    transactions: 115122,
    activeUsers: 58569,
    volume: 103706
  },
  {
    month: '2018-06',
    category: 'games',
    transactions: 350523,
    activeUsers: 13593,
    volume: 3340
  },
  {
    month: '2018-06',
    category: 'exchanges',
    transactions: 856495,
    activeUsers: 65103,
    volume: 314299
  },
  {
    month: '2018-06',
    category: 'property',
    transactions: 13349,
    activeUsers: 324,
    volume: 293
  },
  {
    month: '2018-06',
    category: 'governance',
    transactions: 10016,
    activeUsers: 2103,
    volume: 0
  },
  {
    month: '2018-06',
    category: 'social',
    transactions: 2461,
    activeUsers: 788,
    volume: 221
  },
  {
    month: '2018-06',
    category: 'identity',
    transactions: 27582,
    activeUsers: 8190,
    volume: 736
  },
  {
    month: '2018-06',
    category: 'development',
    transactions: 91976,
    activeUsers: 9972,
    volume: 983
  },
  {
    month: '2018-06',
    category: 'storage',
    transactions: 184751,
    activeUsers: 6227,
    volume: 3
  },
  {
    month: '2018-06',
    category: 'gambling',
    transactions: 38965,
    activeUsers: 4416,
    volume: 6010
  },
  {
    month: '2018-07',
    category: 'security',
    transactions: 378,
    activeUsers: 248,
    volume: 0
  },
  {
    month: '2018-07',
    category: 'property',
    transactions: 9707,
    activeUsers: 379,
    volume: 56
  },
  {
    month: '2018-07',
    category: 'energy',
    transactions: 4,
    activeUsers: 3,
    volume: 0
  },
  {
    month: '2018-07',
    category: 'finance',
    transactions: 62507,
    activeUsers: 12037,
    volume: 94867
  },
  {
    month: '2018-07',
    category: 'development',
    transactions: 61535,
    activeUsers: 9545,
    volume: 704
  },
  {
    month: '2018-07',
    category: 'gambling',
    transactions: 390626,
    activeUsers: 24630,
    volume: 256958
  },
  {
    month: '2018-07',
    category: 'games',
    transactions: 268959,
    activeUsers: 13472,
    volume: 6116
  },
  {
    month: '2018-07',
    category: 'exchanges',
    transactions: 508260,
    activeUsers: 43256,
    volume: 196038
  },
  {
    month: '2018-07',
    category: 'storage',
    transactions: 116616,
    activeUsers: 17276,
    volume: 3
  },
  {
    month: '2018-07',
    category: 'wallet',
    transactions: 253209,
    activeUsers: 36561,
    volume: 44350
  },
  {
    month: '2018-07',
    category: 'social',
    transactions: 5454,
    activeUsers: 1473,
    volume: 457
  },
  {
    month: '2018-07',
    category: 'identity',
    transactions: 18765,
    activeUsers: 9323,
    volume: 762
  },
  {
    month: '2018-07',
    category: 'governance',
    transactions: 6143,
    activeUsers: 1738,
    volume: 1
  },
  {
    month: '2018-07',
    category: 'media',
    transactions: 5302,
    activeUsers: 1409,
    volume: 33
  },
  {
    month: '2018-08',
    category: 'energy',
    transactions: 3,
    activeUsers: 3,
    volume: 1
  },
  {
    month: '2018-08',
    category: 'high-risk',
    transactions: 15,
    activeUsers: 10,
    volume: 1
  },
  {
    month: '2018-08',
    category: 'governance',
    transactions: 4017,
    activeUsers: 1075,
    volume: 21
  },
  {
    month: '2018-08',
    category: 'identity',
    transactions: 16273,
    activeUsers: 4693,
    volume: 1223
  },
  {
    month: '2018-08',
    category: 'wallet',
    transactions: 286562,
    activeUsers: 32946,
    volume: 79495
  },
  {
    month: '2018-08',
    category: 'finance',
    transactions: 83354,
    activeUsers: 11316,
    volume: 250483
  },
  {
    month: '2018-08',
    category: 'development',
    transactions: 21078,
    activeUsers: 5585,
    volume: 596
  },
  {
    month: '2018-08',
    category: 'gambling',
    transactions: 587714,
    activeUsers: 23906,
    volume: 87621
  },
  {
    month: '2018-08',
    category: 'social',
    transactions: 9290,
    activeUsers: 2290,
    volume: 835
  },
  {
    month: '2018-08',
    category: 'storage',
    transactions: 43311,
    activeUsers: 9742,
    volume: 1
  },
  {
    month: '2018-08',
    category: 'exchanges',
    transactions: 528029,
    activeUsers: 44627,
    volume: 132717
  },
  {
    month: '2018-08',
    category: 'security',
    transactions: 662,
    activeUsers: 464,
    volume: 332
  },
  {
    month: '2018-08',
    category: 'media',
    transactions: 31310,
    activeUsers: 21407,
    volume: 1038
  },
  {
    month: '2018-08',
    category: 'games',
    transactions: 393258,
    activeUsers: 15288,
    volume: 8590
  },
  {
    month: '2018-08',
    category: 'property',
    transactions: 61444,
    activeUsers: 1476,
    volume: 32979
  },
  {
    month: '2018-09',
    category: 'energy',
    transactions: 2,
    activeUsers: 2,
    volume: 0
  },
  {
    month: '2018-09',
    category: 'insurance',
    transactions: 39,
    activeUsers: 14,
    volume: 0
  },
  {
    month: '2018-09',
    category: 'high-risk',
    transactions: 51,
    activeUsers: 21,
    volume: 4
  },
  {
    month: '2018-09',
    category: 'property',
    transactions: 11304,
    activeUsers: 665,
    volume: 64
  },
  {
    month: '2018-09',
    category: 'development',
    transactions: 17068,
    activeUsers: 5722,
    volume: 890
  },
  {
    month: '2018-09',
    category: 'social',
    transactions: 9293,
    activeUsers: 2985,
    volume: 193
  },
  {
    month: '2018-09',
    category: 'wallet',
    transactions: 214321,
    activeUsers: 25625,
    volume: 87994
  },
  {
    month: '2018-09',
    category: 'exchanges',
    transactions: 617992,
    activeUsers: 43415,
    volume: 184448
  },
  {
    month: '2018-09',
    category: 'identity',
    transactions: 6880,
    activeUsers: 1246,
    volume: 151
  },
  {
    month: '2018-09',
    category: 'storage',
    transactions: 21059,
    activeUsers: 1803,
    volume: 0
  },
  {
    month: '2018-09',
    category: 'gambling',
    transactions: 426859,
    activeUsers: 17220,
    volume: 84544
  },
  {
    month: '2018-09',
    category: 'security',
    transactions: 363,
    activeUsers: 235,
    volume: 4204
  },
  {
    month: '2018-09',
    category: 'finance',
    transactions: 67339,
    activeUsers: 11374,
    volume: 428263
  },
  {
    month: '2018-09',
    category: 'governance',
    transactions: 4776,
    activeUsers: 1015,
    volume: 27
  },
  {
    month: '2018-09',
    category: 'media',
    transactions: 34649,
    activeUsers: 18521,
    volume: 139
  },
  {
    month: '2018-09',
    category: 'games',
    transactions: 621495,
    activeUsers: 21262,
    volume: 18595
  },
  {
    month: '2018-10',
    category: 'insurance',
    transactions: 29,
    activeUsers: 10,
    volume: 0
  },
  {
    month: '2018-10',
    category: 'high-risk',
    transactions: 22,
    activeUsers: 16,
    volume: 2
  },
  {
    month: '2018-10',
    category: 'social',
    transactions: 18142,
    activeUsers: 4456,
    volume: 662
  },
  {
    month: '2018-10',
    category: 'governance',
    transactions: 6882,
    activeUsers: 1356,
    volume: 41
  },
  {
    month: '2018-10',
    category: 'exchanges',
    transactions: 806084,
    activeUsers: 57658,
    volume: 268720
  },
  {
    month: '2018-10',
    category: 'identity',
    transactions: 10207,
    activeUsers: 1954,
    volume: 241
  },
  {
    month: '2018-10',
    category: 'security',
    transactions: 850,
    activeUsers: 369,
    volume: 2005
  },
  {
    month: '2018-10',
    category: 'property',
    transactions: 14102,
    activeUsers: 642,
    volume: 10
  },
  {
    month: '2018-10',
    category: 'gambling',
    transactions: 571173,
    activeUsers: 23680,
    volume: 127477
  },
  {
    month: '2018-10',
    category: 'energy',
    transactions: 1,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2018-10',
    category: 'media',
    transactions: 13427,
    activeUsers: 8371,
    volume: 19
  },
  {
    month: '2018-10',
    category: 'storage',
    transactions: 30919,
    activeUsers: 10291,
    volume: 0
  },
  {
    month: '2018-10',
    category: 'finance',
    transactions: 82037,
    activeUsers: 14972,
    volume: 225473
  },
  {
    month: '2018-10',
    category: 'games',
    transactions: 573474,
    activeUsers: 19247,
    volume: 18368
  },
  {
    month: '2018-10',
    category: 'wallet',
    transactions: 48524,
    activeUsers: 15413,
    volume: 3
  },
  {
    month: '2018-10',
    category: 'development',
    transactions: 20401,
    activeUsers: 6720,
    volume: 34
  },
  {
    month: '2018-11',
    category: 'security',
    transactions: 1258,
    activeUsers: 455,
    volume: 10032
  },
  {
    month: '2018-11',
    category: 'high-risk',
    transactions: 17,
    activeUsers: 15,
    volume: 2
  },
  {
    month: '2018-11',
    category: 'finance',
    transactions: 126777,
    activeUsers: 30452,
    volume: 582908
  },
  {
    month: '2018-11',
    category: 'wallet',
    transactions: 39464,
    activeUsers: 14226,
    volume: 6
  },
  {
    month: '2018-11',
    category: 'development',
    transactions: 12995,
    activeUsers: 4918,
    volume: 5
  },
  {
    month: '2018-11',
    category: 'social',
    transactions: 17308,
    activeUsers: 4839,
    volume: 462
  },
  {
    month: '2018-11',
    category: 'games',
    transactions: 506939,
    activeUsers: 14347,
    volume: 14009
  },
  {
    month: '2018-11',
    category: 'insurance',
    transactions: 36,
    activeUsers: 28,
    volume: 0
  },
  {
    month: '2018-11',
    category: 'identity',
    transactions: 71783,
    activeUsers: 1067,
    volume: 289
  },
  {
    month: '2018-11',
    category: 'gambling',
    transactions: 496735,
    activeUsers: 21382,
    volume: 89164
  },
  {
    month: '2018-11',
    category: 'governance',
    transactions: 4395,
    activeUsers: 1638,
    volume: 4
  },
  {
    month: '2018-11',
    category: 'exchanges',
    transactions: 756509,
    activeUsers: 47842,
    volume: 684201
  },
  {
    month: '2018-11',
    category: 'media',
    transactions: 4561,
    activeUsers: 1413,
    volume: 859
  },
  {
    month: '2018-11',
    category: 'property',
    transactions: 26533,
    activeUsers: 665,
    volume: 336
  },
  {
    month: '2018-11',
    category: 'storage',
    transactions: 63207,
    activeUsers: 46120,
    volume: 0
  },
  {
    month: '2018-12',
    category: 'insurance',
    transactions: 151,
    activeUsers: 68,
    volume: 0
  },
  {
    month: '2018-12',
    category: 'high-risk',
    transactions: 6979,
    activeUsers: 2133,
    volume: 1777
  },
  {
    month: '2018-12',
    category: 'social',
    transactions: 19667,
    activeUsers: 4691,
    volume: 294
  },
  {
    month: '2018-12',
    category: 'governance',
    transactions: 13230,
    activeUsers: 4855,
    volume: 8
  },
  {
    month: '2018-12',
    category: 'finance',
    transactions: 119514,
    activeUsers: 25144,
    volume: 301670
  },
  {
    month: '2018-12',
    category: 'media',
    transactions: 11951,
    activeUsers: 2840,
    volume: 11
  },
  {
    month: '2018-12',
    category: 'security',
    transactions: 3271,
    activeUsers: 1229,
    volume: 4
  },
  {
    month: '2018-12',
    category: 'gambling',
    transactions: 430803,
    activeUsers: 12217,
    volume: 176908
  },
  {
    month: '2018-12',
    category: 'games',
    transactions: 646647,
    activeUsers: 22317,
    volume: 11490
  },
  {
    month: '2018-12',
    category: 'development',
    transactions: 25263,
    activeUsers: 7640,
    volume: 3
  },
  {
    month: '2018-12',
    category: 'wallet',
    transactions: 39209,
    activeUsers: 13975,
    volume: 4
  },
  {
    month: '2018-12',
    category: 'exchanges',
    transactions: 644223,
    activeUsers: 49235,
    volume: 645687
  },
  {
    month: '2018-12',
    category: 'storage',
    transactions: 126982,
    activeUsers: 111695,
    volume: 0
  },
  {
    month: '2018-12',
    category: 'property',
    transactions: 39879,
    activeUsers: 3514,
    volume: 533
  },
  {
    month: '2018-12',
    category: 'identity',
    transactions: 2100,
    activeUsers: 1130,
    volume: 0
  },
  {
    month: '2018-12',
    category: 'energy',
    transactions: 357,
    activeUsers: 189,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'insurance',
    transactions: 465,
    activeUsers: 105,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'property',
    transactions: 59325,
    activeUsers: 3730,
    volume: 221
  },
  {
    month: '2019-01',
    category: 'media',
    transactions: 24239,
    activeUsers: 5427,
    volume: 32
  },
  {
    month: '2019-01',
    category: 'exchanges',
    transactions: 504044,
    activeUsers: 51207,
    volume: 221805
  },
  {
    month: '2019-01',
    category: 'finance',
    transactions: 112666,
    activeUsers: 26147,
    volume: 135285
  },
  {
    month: '2019-01',
    category: 'energy',
    transactions: 961,
    activeUsers: 443,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'high-risk',
    transactions: 16474,
    activeUsers: 3446,
    volume: 865
  },
  {
    month: '2019-01',
    category: 'governance',
    transactions: 15300,
    activeUsers: 4820,
    volume: 1
  },
  {
    month: '2019-01',
    category: 'development',
    transactions: 32156,
    activeUsers: 9746,
    volume: 2
  },
  {
    month: '2019-01',
    category: 'games',
    transactions: 696875,
    activeUsers: 32630,
    volume: 10627
  },
  {
    month: '2019-01',
    category: 'wallet',
    transactions: 52352,
    activeUsers: 15802,
    volume: 1
  },
  {
    month: '2019-01',
    category: 'gambling',
    transactions: 436641,
    activeUsers: 9580,
    volume: 187830
  },
  {
    month: '2019-01',
    category: 'security',
    transactions: 11734,
    activeUsers: 2828,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'storage',
    transactions: 21237,
    activeUsers: 2807,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'identity',
    transactions: 4106,
    activeUsers: 1575,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'social',
    transactions: 26561,
    activeUsers: 6354,
    volume: 1149
  }
]

const categoryColorMap = {
  gambling: '#FFAAC0',
  'high-risk': '#C1C1C1',
  games: '#FFC8AA',
  exchanges: '#D6F5FF',
  finance: '#A0EBDE',
  wallet: '#BDEBC8',
  development: '#C4E7FF',
  media: '#FFF6B7',
  security: '#E9FFA7',
  property: '#C9D4EB',
  storage: '#C9D7FF',
  identity: '#A3ACD6',
  governance: '#DDEFCB',
  marketplaces: '#A0EBA0',
  energy: '#FFEEBF',
  insurance: '#D7FAD5',
  health: '#C8E2C6',
  social: '#C7DAFF'
}

export default {
  data() {
    return {
      chartData: {
        labels: [],
        datasets: []
      }
    }
  },
  mounted() {
    this.formatLabels()
    this.formatData('transactions')
    this.createChart('categories-per-month-chart', this.chartData)
  },
  methods: {
    createChart(chartId, chartData) {
      var ctx = document.getElementById(chartId)
      var lineChart = new Chart(ctx, {
        // eslint-disable-line no-unused-vars
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          hoverMode: 'index',
          stacked: true,
          title: {
            display: false
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                gridLines: {
                  display: false
                },
                ticks: {
                  fontFamily: 'Overpass',
                  fontStyle: 'bold'
                }
              }
            ],
            yAxes: [
              {
                stacked: true,
                gridLines: {
                  display: false
                },
                ticks: {
                  beginAtZero: true,
                  fontFamily: 'Overpass',
                  fontStyle: 'bold'
                }
              }
            ]
          }
        }
      })
    },
    formatData(facet) {
      let data = rawData.slice()
      let categories = []
      data.map(x => {
        categories.push(x.category)
      })
      categories = [...new Set(categories)]
      let datasets = []
      categories.map(category => {
        let datasetData = []
        this.chartData.labels.map(month => {
          data.map(datum => {
            if (datum.category === category && datum.month === month) {
              datasetData.push(datum[facet])
            }
          })
        })
        datasets.push({
          label: category,
          backgroundColor: categoryColorMap[category],
          data: datasetData
        })
      })
      this.chartData.datasets = datasets
    },
    formatLabels() {
      let data = rawData.slice()
      let labels = []
      data.map(x => {
        labels.push(x.month)
      })
      labels = [...new Set(labels)]
      this.chartData.labels = labels
    }
  }
}
</script>


<style lang="scss" scoped>
.heading-2 {
  @include title-2;
  font-size: 3rem;
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 1rem;
  &.screenshot {
    font-size: 3.1rem;
    margin-top: 4rem;
    margin-bottom: 1rem;
    @include tweakpoint('min-width', 700px) {
      font-size: 4.1rem;
      margin-bottom: 0;
    }
  }
}

.wrapper {
  max-width: 1300px;
  margin: 0 auto;
}

.legend {
  font-weight: 700;
  padding: 15px 5px 10px 5px;
  display: flex;
  align-items: center;
}

.legend-new {
  color: #bd5eff;
}

.legend-title {
  flex: 1;
  text-align: center;
  font-size: 1rem;
  padding: 0 20px;
  @include tweakpoint('min-width', 900px) {
    font-size: 1.2rem;
  }
}

.wrapper-inner {
  position: relative;
}

.logo {
  position: absolute;
  z-index: 10;
  top: 25px;
  left: 50px;
}
</style>
