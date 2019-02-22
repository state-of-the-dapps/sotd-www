<template>
  <div>
    <div>
      <h2
        id="categories-per-month"
        class="heading-2">{{ $t(namespace('title')) }}</h2>
    </div>
    <div class="dropdown-wrapper">
      <BaseDropdown
        :options="options"
        :selected="selected"
        :important="true"
        :title="$t('filters.chooseOne')"
        @select="setActivityType"/>
    </div>
    <div class="wrapper">
      <div class="wrapper-inner">
        <canvas id="categories-per-month-chart"/>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from 'date-fns/format'
import TheLogo from './TheLogo'
import BaseDropdown from './BaseDropdown'

const rawData = [
  {
    month: '2018-01',
    category: 'High-risk',
    transactions: 1,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2018-01',
    category: 'Insurance',
    transactions: 1243,
    activeUsers: 380,
    volume: 0
  },
  {
    month: '2018-01',
    category: 'Property',
    transactions: 13913,
    activeUsers: 3901,
    volume: 476
  },
  {
    month: '2018-01',
    category: 'Social',
    transactions: 12920,
    activeUsers: 4438,
    volume: 22
  },
  {
    month: '2018-01',
    category: 'Health',
    transactions: 4,
    activeUsers: 2,
    volume: 0
  },
  {
    month: '2018-01',
    category: 'Finance',
    transactions: 130606,
    activeUsers: 38136,
    volume: 11324
  },
  {
    month: '2018-01',
    category: 'Security',
    transactions: 99424,
    activeUsers: 17423,
    volume: 47
  },
  {
    month: '2018-01',
    category: 'Identity',
    transactions: 10312,
    activeUsers: 1918,
    volume: 218
  },
  {
    month: '2018-01',
    category: 'Energy',
    transactions: 3160,
    activeUsers: 2272,
    volume: 3236
  },
  {
    month: '2018-01',
    category: 'Wallet',
    transactions: 1262908,
    activeUsers: 165329,
    volume: 282297
  },
  {
    month: '2018-01',
    category: 'Exchanges',
    transactions: 799028,
    activeUsers: 112187,
    volume: 259511
  },
  {
    month: '2018-01',
    category: 'Development',
    transactions: 71963,
    activeUsers: 25919,
    volume: 7
  },
  {
    month: '2018-01',
    category: 'Storage',
    transactions: 11696,
    activeUsers: 2404,
    volume: 0
  },
  {
    month: '2018-01',
    category: 'Gambling',
    transactions: 32092,
    activeUsers: 7869,
    volume: 651
  },
  {
    month: '2018-01',
    category: 'Media',
    transactions: 21290,
    activeUsers: 10627,
    volume: 5
  },
  {
    month: '2018-01',
    category: 'Governance',
    transactions: 38974,
    activeUsers: 11949,
    volume: 5
  },
  {
    month: '2018-01',
    category: 'Games',
    transactions: 270344,
    activeUsers: 27154,
    volume: 2873
  },
  {
    month: '2018-02',
    category: 'Health',
    transactions: 2,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2018-02',
    category: 'Social',
    transactions: 534,
    activeUsers: 310,
    volume: 1
  },
  {
    month: '2018-02',
    category: 'Property',
    transactions: 2463,
    activeUsers: 207,
    volume: 1159
  },
  {
    month: '2018-02',
    category: 'Gambling',
    transactions: 9769,
    activeUsers: 2135,
    volume: 1372
  },
  {
    month: '2018-02',
    category: 'Wallet',
    transactions: 840232,
    activeUsers: 95207,
    volume: 142228
  },
  {
    month: '2018-02',
    category: 'Storage',
    transactions: 7407,
    activeUsers: 1166,
    volume: 0
  },
  {
    month: '2018-02',
    category: 'Finance',
    transactions: 24688,
    activeUsers: 7381,
    volume: 17
  },
  {
    month: '2018-02',
    category: 'Exchanges',
    transactions: 448620,
    activeUsers: 49635,
    volume: 152143
  },
  {
    month: '2018-02',
    category: 'Security',
    transactions: 12038,
    activeUsers: 3898,
    volume: 4
  },
  {
    month: '2018-02',
    category: 'Games',
    transactions: 422142,
    activeUsers: 14651,
    volume: 92938
  },
  {
    month: '2018-02',
    category: 'Governance',
    transactions: 11744,
    activeUsers: 3171,
    volume: 0
  },
  {
    month: '2018-02',
    category: 'Identity',
    transactions: 15783,
    activeUsers: 1964,
    volume: 248
  },
  {
    month: '2018-02',
    category: 'Development',
    transactions: 7426,
    activeUsers: 2196,
    volume: 0
  },
  {
    month: '2018-02',
    category: 'Energy',
    transactions: 1,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2018-02',
    category: 'Media',
    transactions: 6042,
    activeUsers: 1965,
    volume: 175
  },
  {
    month: '2018-03',
    category: 'Media',
    transactions: 4845,
    activeUsers: 1540,
    volume: 5
  },
  {
    month: '2018-03',
    category: 'Energy',
    transactions: 2,
    activeUsers: 2,
    volume: 0
  },
  {
    month: '2018-03',
    category: 'Exchanges',
    transactions: 641370,
    activeUsers: 58083,
    volume: 221329
  },
  {
    month: '2018-03',
    category: 'Games',
    transactions: 494472,
    activeUsers: 13373,
    volume: 7539
  },
  {
    month: '2018-03',
    category: 'Development',
    transactions: 5696,
    activeUsers: 1770,
    volume: 0
  },
  {
    month: '2018-03',
    category: 'Gambling',
    transactions: 46214,
    activeUsers: 5570,
    volume: 12919
  },
  {
    month: '2018-03',
    category: 'Health',
    transactions: 1,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2018-03',
    category: 'Social',
    transactions: 1000,
    activeUsers: 300,
    volume: 2
  },
  {
    month: '2018-03',
    category: 'Wallet',
    transactions: 515067,
    activeUsers: 62319,
    volume: 79709
  },
  {
    month: '2018-03',
    category: 'Identity',
    transactions: 25781,
    activeUsers: 1643,
    volume: 327
  },
  {
    month: '2018-03',
    category: 'Governance',
    transactions: 4615,
    activeUsers: 2252,
    volume: 0
  },
  {
    month: '2018-03',
    category: 'Security',
    transactions: 12314,
    activeUsers: 6440,
    volume: 6
  },
  {
    month: '2018-03',
    category: 'Finance',
    transactions: 14884,
    activeUsers: 5823,
    volume: 16
  },
  {
    month: '2018-03',
    category: 'Storage',
    transactions: 13892,
    activeUsers: 1103,
    volume: 0
  },
  {
    month: '2018-03',
    category: 'Property',
    transactions: 4343,
    activeUsers: 794,
    volume: 4233
  },
  {
    month: '2018-04',
    category: 'Property',
    transactions: 5241,
    activeUsers: 403,
    volume: 423
  },
  {
    month: '2018-04',
    category: 'Social',
    transactions: 646,
    activeUsers: 305,
    volume: 0
  },
  {
    month: '2018-04',
    category: 'Development',
    transactions: 6314,
    activeUsers: 2471,
    volume: 2
  },
  {
    month: '2018-04',
    category: 'Governance',
    transactions: 9914,
    activeUsers: 2566,
    volume: 7
  },
  {
    month: '2018-04',
    category: 'Games',
    transactions: 615098,
    activeUsers: 17887,
    volume: 6628
  },
  {
    month: '2018-04',
    category: 'Wallet',
    transactions: 495542,
    activeUsers: 75588,
    volume: 77231
  },
  {
    month: '2018-04',
    category: 'Exchanges',
    transactions: 681844,
    activeUsers: 60970,
    volume: 295569
  },
  {
    month: '2018-04',
    category: 'Gambling',
    transactions: 179337,
    activeUsers: 11324,
    volume: 26711
  },
  {
    month: '2018-04',
    category: 'Storage',
    transactions: 13695,
    activeUsers: 1011,
    volume: 1
  },
  {
    month: '2018-04',
    category: 'Finance',
    transactions: 22008,
    activeUsers: 7008,
    volume: 589
  },
  {
    month: '2018-04',
    category: 'Security',
    transactions: 11376,
    activeUsers: 4767,
    volume: 16
  },
  {
    month: '2018-04',
    category: 'Media',
    transactions: 14400,
    activeUsers: 3103,
    volume: 49
  },
  {
    month: '2018-04',
    category: 'Identity',
    transactions: 30309,
    activeUsers: 1376,
    volume: 196
  },
  {
    month: '2018-05',
    category: 'Energy',
    transactions: 18,
    activeUsers: 10,
    volume: 0
  },
  {
    month: '2018-05',
    category: 'Property',
    transactions: 2486,
    activeUsers: 193,
    volume: 31
  },
  {
    month: '2018-05',
    category: 'Social',
    transactions: 2224,
    activeUsers: 679,
    volume: 60
  },
  {
    month: '2018-05',
    category: 'Gambling',
    transactions: 45415,
    activeUsers: 6558,
    volume: 7307
  },
  {
    month: '2018-05',
    category: 'Governance',
    transactions: 10411,
    activeUsers: 3048,
    volume: 2
  },
  {
    month: '2018-05',
    category: 'Finance',
    transactions: 78532,
    activeUsers: 17001,
    volume: 46877
  },
  {
    month: '2018-05',
    category: 'Storage',
    transactions: 22774,
    activeUsers: 2088,
    volume: 0
  },
  {
    month: '2018-05',
    category: 'Exchanges',
    transactions: 1070414,
    activeUsers: 86404,
    volume: 439677
  },
  {
    month: '2018-05',
    category: 'Media',
    transactions: 10588,
    activeUsers: 2141,
    volume: 46
  },
  {
    month: '2018-05',
    category: 'Wallet',
    transactions: 436692,
    activeUsers: 65516,
    volume: 103685
  },
  {
    month: '2018-05',
    category: 'Security',
    transactions: 183962,
    activeUsers: 2485,
    volume: 11
  },
  {
    month: '2018-05',
    category: 'Development',
    transactions: 69392,
    activeUsers: 11986,
    volume: 311
  },
  {
    month: '2018-05',
    category: 'Games',
    transactions: 408252,
    activeUsers: 27995,
    volume: 6644
  },
  {
    month: '2018-05',
    category: 'Identity',
    transactions: 33078,
    activeUsers: 1625,
    volume: 225
  },
  {
    month: '2018-06',
    category: 'Health',
    transactions: 2,
    activeUsers: 2,
    volume: 0
  },
  {
    month: '2018-06',
    category: 'Energy',
    transactions: 6,
    activeUsers: 5,
    volume: 0
  },
  {
    month: '2018-06',
    category: 'Media',
    transactions: 4615,
    activeUsers: 1343,
    volume: 43
  },
  {
    month: '2018-06',
    category: 'Security',
    transactions: 1723,
    activeUsers: 687,
    volume: 4
  },
  {
    month: '2018-06',
    category: 'Wallet',
    transactions: 330896,
    activeUsers: 46607,
    volume: 91040
  },
  {
    month: '2018-06',
    category: 'Finance',
    transactions: 115122,
    activeUsers: 58569,
    volume: 103706
  },
  {
    month: '2018-06',
    category: 'Games',
    transactions: 350523,
    activeUsers: 13593,
    volume: 3340
  },
  {
    month: '2018-06',
    category: 'Exchanges',
    transactions: 856495,
    activeUsers: 65103,
    volume: 314299
  },
  {
    month: '2018-06',
    category: 'Property',
    transactions: 13349,
    activeUsers: 324,
    volume: 293
  },
  {
    month: '2018-06',
    category: 'Governance',
    transactions: 10016,
    activeUsers: 2103,
    volume: 0
  },
  {
    month: '2018-06',
    category: 'Social',
    transactions: 2461,
    activeUsers: 788,
    volume: 221
  },
  {
    month: '2018-06',
    category: 'Identity',
    transactions: 27582,
    activeUsers: 8190,
    volume: 736
  },
  {
    month: '2018-06',
    category: 'Development',
    transactions: 91976,
    activeUsers: 9972,
    volume: 983
  },
  {
    month: '2018-06',
    category: 'Storage',
    transactions: 184751,
    activeUsers: 6227,
    volume: 3
  },
  {
    month: '2018-06',
    category: 'Gambling',
    transactions: 38965,
    activeUsers: 4416,
    volume: 6010
  },
  {
    month: '2018-07',
    category: 'Security',
    transactions: 378,
    activeUsers: 248,
    volume: 0
  },
  {
    month: '2018-07',
    category: 'Property',
    transactions: 9707,
    activeUsers: 379,
    volume: 56
  },
  {
    month: '2018-07',
    category: 'Energy',
    transactions: 4,
    activeUsers: 3,
    volume: 0
  },
  {
    month: '2018-07',
    category: 'Finance',
    transactions: 62507,
    activeUsers: 12037,
    volume: 94867
  },
  {
    month: '2018-07',
    category: 'Development',
    transactions: 61535,
    activeUsers: 9545,
    volume: 704
  },
  {
    month: '2018-07',
    category: 'Gambling',
    transactions: 390626,
    activeUsers: 24630,
    volume: 256958
  },
  {
    month: '2018-07',
    category: 'Games',
    transactions: 268959,
    activeUsers: 13472,
    volume: 6116
  },
  {
    month: '2018-07',
    category: 'Exchanges',
    transactions: 508260,
    activeUsers: 43256,
    volume: 196038
  },
  {
    month: '2018-07',
    category: 'Storage',
    transactions: 116616,
    activeUsers: 17276,
    volume: 3
  },
  {
    month: '2018-07',
    category: 'Wallet',
    transactions: 253209,
    activeUsers: 36561,
    volume: 44350
  },
  {
    month: '2018-07',
    category: 'Social',
    transactions: 5454,
    activeUsers: 1473,
    volume: 457
  },
  {
    month: '2018-07',
    category: 'Identity',
    transactions: 18765,
    activeUsers: 9323,
    volume: 762
  },
  {
    month: '2018-07',
    category: 'Governance',
    transactions: 6143,
    activeUsers: 1738,
    volume: 1
  },
  {
    month: '2018-07',
    category: 'Media',
    transactions: 5302,
    activeUsers: 1409,
    volume: 33
  },
  {
    month: '2018-08',
    category: 'Energy',
    transactions: 3,
    activeUsers: 3,
    volume: 1
  },
  {
    month: '2018-08',
    category: 'High-risk',
    transactions: 15,
    activeUsers: 10,
    volume: 1
  },
  {
    month: '2018-08',
    category: 'Governance',
    transactions: 4017,
    activeUsers: 1075,
    volume: 21
  },
  {
    month: '2018-08',
    category: 'Identity',
    transactions: 16273,
    activeUsers: 4693,
    volume: 1223
  },
  {
    month: '2018-08',
    category: 'Wallet',
    transactions: 286562,
    activeUsers: 32946,
    volume: 79495
  },
  {
    month: '2018-08',
    category: 'Finance',
    transactions: 83354,
    activeUsers: 11316,
    volume: 250483
  },
  {
    month: '2018-08',
    category: 'Development',
    transactions: 21078,
    activeUsers: 5585,
    volume: 596
  },
  {
    month: '2018-08',
    category: 'Gambling',
    transactions: 587714,
    activeUsers: 23906,
    volume: 87621
  },
  {
    month: '2018-08',
    category: 'Social',
    transactions: 9290,
    activeUsers: 2290,
    volume: 835
  },
  {
    month: '2018-08',
    category: 'Storage',
    transactions: 43311,
    activeUsers: 9742,
    volume: 1
  },
  {
    month: '2018-08',
    category: 'Exchanges',
    transactions: 528029,
    activeUsers: 44627,
    volume: 132717
  },
  {
    month: '2018-08',
    category: 'Security',
    transactions: 662,
    activeUsers: 464,
    volume: 332
  },
  {
    month: '2018-08',
    category: 'Media',
    transactions: 31310,
    activeUsers: 21407,
    volume: 1038
  },
  {
    month: '2018-08',
    category: 'Games',
    transactions: 393258,
    activeUsers: 15288,
    volume: 8590
  },
  {
    month: '2018-08',
    category: 'Property',
    transactions: 61444,
    activeUsers: 1476,
    volume: 32979
  },
  {
    month: '2018-09',
    category: 'Energy',
    transactions: 2,
    activeUsers: 2,
    volume: 0
  },
  {
    month: '2018-09',
    category: 'Insurance',
    transactions: 39,
    activeUsers: 14,
    volume: 0
  },
  {
    month: '2018-09',
    category: 'High-risk',
    transactions: 51,
    activeUsers: 21,
    volume: 4
  },
  {
    month: '2018-09',
    category: 'Property',
    transactions: 11304,
    activeUsers: 665,
    volume: 64
  },
  {
    month: '2018-09',
    category: 'Development',
    transactions: 17068,
    activeUsers: 5722,
    volume: 890
  },
  {
    month: '2018-09',
    category: 'Social',
    transactions: 9293,
    activeUsers: 2985,
    volume: 193
  },
  {
    month: '2018-09',
    category: 'Wallet',
    transactions: 214321,
    activeUsers: 25625,
    volume: 87994
  },
  {
    month: '2018-09',
    category: 'Exchanges',
    transactions: 617992,
    activeUsers: 43415,
    volume: 184448
  },
  {
    month: '2018-09',
    category: 'Identity',
    transactions: 6880,
    activeUsers: 1246,
    volume: 151
  },
  {
    month: '2018-09',
    category: 'Storage',
    transactions: 21059,
    activeUsers: 1803,
    volume: 0
  },
  {
    month: '2018-09',
    category: 'Gambling',
    transactions: 426859,
    activeUsers: 17220,
    volume: 84544
  },
  {
    month: '2018-09',
    category: 'Security',
    transactions: 363,
    activeUsers: 235,
    volume: 4204
  },
  {
    month: '2018-09',
    category: 'Finance',
    transactions: 67339,
    activeUsers: 11374,
    volume: 428263
  },
  {
    month: '2018-09',
    category: 'Governance',
    transactions: 4776,
    activeUsers: 1015,
    volume: 27
  },
  {
    month: '2018-09',
    category: 'Media',
    transactions: 34649,
    activeUsers: 18521,
    volume: 139
  },
  {
    month: '2018-09',
    category: 'Games',
    transactions: 621495,
    activeUsers: 21262,
    volume: 18595
  },
  {
    month: '2018-10',
    category: 'Insurance',
    transactions: 29,
    activeUsers: 10,
    volume: 0
  },
  {
    month: '2018-10',
    category: 'High-risk',
    transactions: 22,
    activeUsers: 16,
    volume: 2
  },
  {
    month: '2018-10',
    category: 'Social',
    transactions: 18142,
    activeUsers: 4456,
    volume: 662
  },
  {
    month: '2018-10',
    category: 'Governance',
    transactions: 6882,
    activeUsers: 1356,
    volume: 41
  },
  {
    month: '2018-10',
    category: 'Exchanges',
    transactions: 806084,
    activeUsers: 57658,
    volume: 268720
  },
  {
    month: '2018-10',
    category: 'Identity',
    transactions: 10207,
    activeUsers: 1954,
    volume: 241
  },
  {
    month: '2018-10',
    category: 'Security',
    transactions: 850,
    activeUsers: 369,
    volume: 2005
  },
  {
    month: '2018-10',
    category: 'Property',
    transactions: 14102,
    activeUsers: 642,
    volume: 10
  },
  {
    month: '2018-10',
    category: 'Gambling',
    transactions: 571173,
    activeUsers: 23680,
    volume: 127477
  },
  {
    month: '2018-10',
    category: 'Energy',
    transactions: 1,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2018-10',
    category: 'Media',
    transactions: 13427,
    activeUsers: 8371,
    volume: 19
  },
  {
    month: '2018-10',
    category: 'Storage',
    transactions: 30919,
    activeUsers: 10291,
    volume: 0
  },
  {
    month: '2018-10',
    category: 'Finance',
    transactions: 82037,
    activeUsers: 14972,
    volume: 225473
  },
  {
    month: '2018-10',
    category: 'Games',
    transactions: 573474,
    activeUsers: 19247,
    volume: 18368
  },
  {
    month: '2018-10',
    category: 'Wallet',
    transactions: 48524,
    activeUsers: 15413,
    volume: 3
  },
  {
    month: '2018-10',
    category: 'Development',
    transactions: 20401,
    activeUsers: 6720,
    volume: 34
  },
  {
    month: '2018-11',
    category: 'Security',
    transactions: 1258,
    activeUsers: 455,
    volume: 10032
  },
  {
    month: '2018-11',
    category: 'High-risk',
    transactions: 17,
    activeUsers: 15,
    volume: 2
  },
  {
    month: '2018-11',
    category: 'Finance',
    transactions: 126777,
    activeUsers: 30452,
    volume: 582908
  },
  {
    month: '2018-11',
    category: 'Wallet',
    transactions: 39464,
    activeUsers: 14226,
    volume: 6
  },
  {
    month: '2018-11',
    category: 'Development',
    transactions: 12995,
    activeUsers: 4918,
    volume: 5
  },
  {
    month: '2018-11',
    category: 'Social',
    transactions: 17308,
    activeUsers: 4839,
    volume: 462
  },
  {
    month: '2018-11',
    category: 'Games',
    transactions: 506939,
    activeUsers: 14347,
    volume: 14009
  },
  {
    month: '2018-11',
    category: 'Insurance',
    transactions: 36,
    activeUsers: 28,
    volume: 0
  },
  {
    month: '2018-11',
    category: 'Identity',
    transactions: 71783,
    activeUsers: 1067,
    volume: 289
  },
  {
    month: '2018-11',
    category: 'Gambling',
    transactions: 496735,
    activeUsers: 21382,
    volume: 89164
  },
  {
    month: '2018-11',
    category: 'Governance',
    transactions: 4395,
    activeUsers: 1638,
    volume: 4
  },
  {
    month: '2018-11',
    category: 'Exchanges',
    transactions: 756509,
    activeUsers: 47842,
    volume: 684201
  },
  {
    month: '2018-11',
    category: 'Media',
    transactions: 4561,
    activeUsers: 1413,
    volume: 859
  },
  {
    month: '2018-11',
    category: 'Property',
    transactions: 26533,
    activeUsers: 665,
    volume: 336
  },
  {
    month: '2018-11',
    category: 'Storage',
    transactions: 63207,
    activeUsers: 46120,
    volume: 0
  },
  {
    month: '2018-12',
    category: 'Insurance',
    transactions: 151,
    activeUsers: 68,
    volume: 0
  },
  {
    month: '2018-12',
    category: 'High-risk',
    transactions: 6979,
    activeUsers: 2133,
    volume: 1777
  },
  {
    month: '2018-12',
    category: 'Social',
    transactions: 19667,
    activeUsers: 4691,
    volume: 294
  },
  {
    month: '2018-12',
    category: 'Governance',
    transactions: 13230,
    activeUsers: 4855,
    volume: 8
  },
  {
    month: '2018-12',
    category: 'Finance',
    transactions: 119514,
    activeUsers: 25144,
    volume: 301670
  },
  {
    month: '2018-12',
    category: 'Media',
    transactions: 11951,
    activeUsers: 2840,
    volume: 11
  },
  {
    month: '2018-12',
    category: 'Security',
    transactions: 3271,
    activeUsers: 1229,
    volume: 4
  },
  {
    month: '2018-12',
    category: 'Gambling',
    transactions: 430803,
    activeUsers: 12217,
    volume: 176908
  },
  {
    month: '2018-12',
    category: 'Games',
    transactions: 646647,
    activeUsers: 22317,
    volume: 11490
  },
  {
    month: '2018-12',
    category: 'Development',
    transactions: 25263,
    activeUsers: 7640,
    volume: 3
  },
  {
    month: '2018-12',
    category: 'Wallet',
    transactions: 39209,
    activeUsers: 13975,
    volume: 4
  },
  {
    month: '2018-12',
    category: 'Exchanges',
    transactions: 644223,
    activeUsers: 49235,
    volume: 645687
  },
  {
    month: '2018-12',
    category: 'Storage',
    transactions: 126982,
    activeUsers: 111695,
    volume: 0
  },
  {
    month: '2018-12',
    category: 'Property',
    transactions: 39879,
    activeUsers: 3514,
    volume: 533
  },
  {
    month: '2018-12',
    category: 'Identity',
    transactions: 2100,
    activeUsers: 1130,
    volume: 0
  },
  {
    month: '2018-12',
    category: 'Energy',
    transactions: 357,
    activeUsers: 189,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'Insurance',
    transactions: 465,
    activeUsers: 105,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'Property',
    transactions: 59325,
    activeUsers: 3730,
    volume: 221
  },
  {
    month: '2019-01',
    category: 'Media',
    transactions: 24239,
    activeUsers: 5427,
    volume: 32
  },
  {
    month: '2019-01',
    category: 'Exchanges',
    transactions: 504044,
    activeUsers: 51207,
    volume: 221805
  },
  {
    month: '2019-01',
    category: 'Finance',
    transactions: 112666,
    activeUsers: 26147,
    volume: 135285
  },
  {
    month: '2019-01',
    category: 'Energy',
    transactions: 961,
    activeUsers: 443,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'High-risk',
    transactions: 16474,
    activeUsers: 3446,
    volume: 865
  },
  {
    month: '2019-01',
    category: 'Governance',
    transactions: 15300,
    activeUsers: 4820,
    volume: 1
  },
  {
    month: '2019-01',
    category: 'Development',
    transactions: 32156,
    activeUsers: 9746,
    volume: 2
  },
  {
    month: '2019-01',
    category: 'Games',
    transactions: 696875,
    activeUsers: 32630,
    volume: 10627
  },
  {
    month: '2019-01',
    category: 'Wallet',
    transactions: 52352,
    activeUsers: 15802,
    volume: 1
  },
  {
    month: '2019-01',
    category: 'Gambling',
    transactions: 436641,
    activeUsers: 9580,
    volume: 187830
  },
  {
    month: '2019-01',
    category: 'Security',
    transactions: 11734,
    activeUsers: 2828,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'Storage',
    transactions: 21237,
    activeUsers: 2807,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'Identity',
    transactions: 4106,
    activeUsers: 1575,
    volume: 0
  },
  {
    month: '2019-01',
    category: 'Social',
    transactions: 26561,
    activeUsers: 6354,
    volume: 1149
  }
]

const categoryColorMap = {
  Gambling: '#FFAAC0',
  'High-risk': '#C1C1C1',
  Games: '#FFC8AA',
  Exchanges: '#D6F5FF',
  Finance: '#A0EBDE',
  Wallet: '#BDEBC8',
  Development: '#C4E7FF',
  Media: '#FFF6B7',
  Security: '#E9FFA7',
  Property: '#C9D4EB',
  Storage: '#C9D7FF',
  Identity: '#A3ACD6',
  Governance: '#DDEFCB',
  Marketplaces: '#A0EBA0',
  Energy: '#FFEEBF',
  Insurance: '#D7FAD5',
  Health: '#C8E2C6',
  Social: '#C7DAFF'
}

export default {
  components: {
    BaseDropdown,
    TheLogo
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: []
      },
      options: [
        {
          text: this.$t(this.namespace('transactions')),
          selection: 'transactions'
        },
        {
          text: this.$t(this.namespace('activeUsers')),
          selection: 'activeUsers'
        },
        {
          text: this.$t(this.namespace('volume')),
          selection: 'volume'
        }
      ],
      selectionMap: {
        activeUsers: 'Active users',
        transactions: 'Transactions',
        volume: 'Volume (USD)'
      },
      selected: 'Transactions'
    }
  },
  mounted() {
    this.formatLabels()
    const facet =
      this.$route.query.categoryActivity || this.options[0].selection
    this.formatData(facet)
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
          tooltips: {
            mode: 'index',
            callbacks: {
              label: (tooltipItem, data) => {
                let category = data.datasets[tooltipItem.datasetIndex].label
                return `${category}: ${tooltipItem.yLabel.toLocaleString()}`
              }
            }
          },
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
                  fontStyle: 'bold',
                  callback: function(value, index, values) {
                    return formatDate(value, `MMM 'YY`)
                  }
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
                  fontStyle: 'bold',
                  callback: function(value, index, values) {
                    return value.toLocaleString()
                  }
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
      categories.sort()
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
    },
    setActivityType(selection) {
      this.selected = this.selectionMap[selection]
      this.formatLabels()
      this.formatData(selection)
      this.createChart('categories-per-month-chart', this.chartData)
      this.$mixpanel.track('Category Stats', { selection })
    }
  }
}
</script>


<style lang="scss" scoped>
.dropdown-wrapper {
  padding-top: 10px;
  padding-bottom: 25px;
  width: 200px;
  margin: 0 auto;
}

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
  margin: 0 auto;
  overflow-x: scroll;
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
  width: 1300px;
  margin: 0 auto;
}

.logo {
  position: absolute;
  z-index: 10;
  top: 25px;
  right: 50px;
}
</style>
