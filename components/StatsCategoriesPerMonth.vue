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
        @select="setActivityType"
      />
    </div>
    <div class="wrapper">
      <div class="wrapper-inner">
        <div class="logo">
          <TheLogo
            :width="120"
            :height="26"
            fill="black"/>
        </div>
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
  },
  {
    month: '2019-02',
    category: 'Insurance',
    transactions: 394,
    activeUsers: 116,
    volume: 0
  },
  {
    month: '2019-02',
    category: 'Gambling',
    transactions: 340068,
    activeUsers: 10175,
    volume: 180728
  },
  {
    month: '2019-02',
    category: 'High-risk',
    transactions: 15354,
    activeUsers: 2586,
    volume: 2851
  },
  {
    month: '2019-02',
    category: 'Marketplaces',
    transactions: 21340,
    activeUsers: 1844,
    volume: 2319
  },
  {
    month: '2019-02',
    category: 'Development',
    transactions: 31418,
    activeUsers: 8710,
    volume: 1
  },
  {
    month: '2019-02',
    category: 'Property',
    transactions: 48610,
    activeUsers: 3380,
    volume: 116
  },
  {
    month: '2019-02',
    category: 'Identity',
    transactions: 2700,
    activeUsers: 975,
    volume: 0
  },
  {
    month: '2019-02',
    category: 'Media',
    transactions: 34377,
    activeUsers: 10022,
    volume: 12
  },
  {
    month: '2019-02',
    category: 'Security',
    transactions: 7186,
    activeUsers: 1744,
    volume: 0
  },
  {
    month: '2019-02',
    category: 'Finance',
    transactions: 170225,
    activeUsers: 33286,
    volume: 134928
  },
  {
    month: '2019-02',
    category: 'Governance',
    transactions: 6625,
    activeUsers: 1936,
    volume: 1
  },
  {
    month: '2019-02',
    category: 'Wallet',
    transactions: 63519,
    activeUsers: 25999,
    volume: 0
  },
  {
    month: '2019-02',
    category: 'Energy',
    transactions: 644,
    activeUsers: 305,
    volume: 0
  },
  {
    month: '2019-02',
    category: 'Exchanges',
    transactions: 556675,
    activeUsers: 48472,
    volume: 324276
  },
  {
    month: '2019-02',
    category: 'Social',
    transactions: 18425,
    activeUsers: 5010,
    volume: 306
  },
  {
    month: '2019-02',
    category: 'Games',
    transactions: 553915,
    activeUsers: 25093,
    volume: 10115
  },
  {
    month: '2019-02',
    category: 'Storage',
    transactions: 31552,
    activeUsers: 7092,
    volume: 0
  },

  {
    month: '2019-03',
    category: 'Insurance',
    transactions: 1062,
    activeUsers: 444,
    volume: 0
  },
  {
    month: '2019-03',
    category: 'Identity',
    transactions: 4997,
    activeUsers: 1860,
    volume: 0
  },
  {
    month: '2019-03',
    category: 'High-risk',
    transactions: 36630,
    activeUsers: 2911,
    volume: 1149
  },
  {
    month: '2019-03',
    category: 'Storage',
    transactions: 24575,
    activeUsers: 2862,
    volume: 0
  },
  {
    month: '2019-03',
    category: 'Gambling',
    transactions: 463305,
    activeUsers: 9122,
    volume: 311006
  },
  {
    month: '2019-03',
    category: 'Energy',
    transactions: 95,
    activeUsers: 64,
    volume: 0
  },
  {
    month: '2019-03',
    category: 'Security',
    transactions: 7943,
    activeUsers: 2127,
    volume: 0
  },
  {
    month: '2019-03',
    category: 'Finance',
    transactions: 308368,
    activeUsers: 40868,
    volume: 177373
  },
  {
    month: '2019-03',
    category: 'Governance',
    transactions: 6001,
    activeUsers: 2159,
    volume: 72
  },
  {
    month: '2019-03',
    category: 'Media',
    transactions: 69774,
    activeUsers: 31224,
    volume: 150
  },
  {
    month: '2019-03',
    category: 'Social',
    transactions: 25566,
    activeUsers: 6680,
    volume: 125
  },
  {
    month: '2019-03',
    category: 'Exchanges',
    transactions: 695751,
    activeUsers: 62792,
    volume: 491767
  },
  {
    month: '2019-03',
    category: 'Wallet',
    transactions: 108921,
    activeUsers: 39783,
    volume: 3
  },
  {
    month: '2019-03',
    category: 'Marketplaces',
    transactions: 89079,
    activeUsers: 4753,
    volume: 6128
  },
  {
    month: '2019-03',
    category: 'Games',
    transactions: 807902,
    activeUsers: 42105,
    volume: 10726
  },
  {
    month: '2019-03',
    category: 'Property',
    transactions: 84531,
    activeUsers: 4319,
    volume: 1047
  },
  {
    month: '2019-03',
    category: 'Development',
    transactions: 42364,
    activeUsers: 12106,
    volume: 1
  },

  {
    month: '2019-04',
    category: 'Energy',
    transactions: 204,
    activeUsers: 123,
    volume: 0
  },
  {
    month: '2019-04',
    category: 'Governance',
    transactions: 8925,
    activeUsers: 1994,
    volume: 407
  },
  {
    month: '2019-04',
    category: 'Media',
    transactions: 118244,
    activeUsers: 29989,
    volume: 22
  },
  {
    month: '2019-04',
    category: 'Security',
    transactions: 6343,
    activeUsers: 2122,
    volume: 0
  },
  {
    month: '2019-04',
    category: 'Identity',
    transactions: 4603,
    activeUsers: 1389,
    volume: 0
  },
  {
    month: '2019-04',
    category: 'Marketplaces',
    transactions: 217653,
    activeUsers: 9062,
    volume: 6042
  },
  {
    month: '2019-04',
    category: 'Gambling',
    transactions: 452934,
    activeUsers: 14250,
    volume: 512976
  },
  {
    month: '2019-04',
    category: 'Wallet',
    transactions: 121312,
    activeUsers: 44745,
    volume: 1
  },
  {
    month: '2019-04',
    category: 'Insurance',
    transactions: 519,
    activeUsers: 182,
    volume: 0
  },
  {
    month: '2019-04',
    category: 'Property',
    transactions: 58625,
    activeUsers: 3752,
    volume: 296
  },
  {
    month: '2019-04',
    category: 'Exchanges',
    transactions: 712655,
    activeUsers: 64941,
    volume: 379633
  },
  {
    month: '2019-04',
    category: 'Storage',
    transactions: 18019,
    activeUsers: 2427,
    volume: 0
  },
  {
    month: '2019-04',
    category: 'Games',
    transactions: 515587,
    activeUsers: 23460,
    volume: 3820
  },
  {
    month: '2019-04',
    category: 'Finance',
    transactions: 219033,
    activeUsers: 35969,
    volume: 205438
  },
  {
    month: '2019-04',
    category: 'Development',
    transactions: 33577,
    activeUsers: 11062,
    volume: 1
  },
  {
    month: '2019-04',
    category: 'Social',
    transactions: 38242,
    activeUsers: 5939,
    volume: 69
  },
  {
    month: '2019-04',
    category: 'High-risk',
    transactions: 39509,
    activeUsers: 7566,
    volume: 21874
  },

  {
    month: '2019-05',
    category: 'Insurance',
    transactions: 404,
    activeUsers: 188,
    volume: 0
  },
  {
    month: '2019-05',
    category: 'Identity',
    transactions: 4447,
    activeUsers: 1337,
    volume: 0
  },
  {
    month: '2019-05',
    category: 'Governance',
    transactions: 6517,
    activeUsers: 1812,
    volume: 278
  },
  {
    month: '2019-05',
    category: 'Storage',
    transactions: 17321,
    activeUsers: 2077,
    volume: 0
  },
  {
    month: '2019-05',
    category: 'Security',
    transactions: 27909,
    activeUsers: 5432,
    volume: 0
  },
  {
    month: '2019-05',
    category: 'Property',
    transactions: 62240,
    activeUsers: 4551,
    volume: 11
  },
  {
    month: '2019-05',
    category: 'Exchanges',
    transactions: 773331,
    activeUsers: 61921,
    volume: 357737
  },
  {
    month: '2019-05',
    category: 'High-risk',
    transactions: 83622,
    activeUsers: 48690,
    volume: 251764
  },
  {
    month: '2019-05',
    category: 'Development',
    transactions: 32800,
    activeUsers: 10666,
    volume: 2
  },
  {
    month: '2019-05',
    category: 'Media',
    transactions: 37877,
    activeUsers: 15295,
    volume: 30
  },
  {
    month: '2019-05',
    category: 'Finance',
    transactions: 189259,
    activeUsers: 53238,
    volume: 199192
  },
  {
    month: '2019-05',
    category: 'Marketplaces',
    transactions: 317416,
    activeUsers: 8892,
    volume: 5133
  },
  {
    month: '2019-05',
    category: 'Gambling',
    transactions: 557280,
    activeUsers: 12908,
    volume: 271958
  },
  {
    month: '2019-05',
    category: 'Games',
    transactions: 432929,
    activeUsers: 22369,
    volume: 3048
  },
  {
    month: '2019-05',
    category: 'Energy',
    transactions: 216,
    activeUsers: 143,
    volume: 0
  },
  {
    month: '2019-05',
    category: 'Wallet',
    transactions: 194680,
    activeUsers: 65690,
    volume: 50
  },
  {
    month: '2019-05',
    category: 'Social',
    transactions: 58824,
    activeUsers: 7374,
    volume: 90
  },

  {
    month: '2019-06',
    category: 'Energy',
    transactions: 207,
    activeUsers: 106,
    volume: 0
  },
  {
    month: '2019-06',
    category: 'Identity',
    transactions: 5849,
    activeUsers: 1579,
    volume: 0
  },
  {
    month: '2019-06',
    category: 'Storage',
    transactions: 25070,
    activeUsers: 3714,
    volume: 0
  },
  {
    month: '2019-06',
    category: 'High-risk',
    transactions: 58658,
    activeUsers: 34968,
    volume: 143545
  },
  {
    month: '2019-06',
    category: 'Media',
    transactions: 38278,
    activeUsers: 9417,
    volume: 2
  },
  {
    month: '2019-06',
    category: 'Gambling',
    transactions: 405014,
    activeUsers: 12430,
    volume: 244813
  },
  {
    month: '2019-06',
    category: 'Exchanges',
    transactions: 856133,
    activeUsers: 64281,
    volume: 333193
  },
  {
    month: '2019-06',
    category: 'Security',
    transactions: 64180,
    activeUsers: 14100,
    volume: 1
  },
  {
    month: '2019-06',
    category: 'Social',
    transactions: 48292,
    activeUsers: 6986,
    volume: 60
  },
  {
    month: '2019-06',
    category: 'Property',
    transactions: 35604,
    activeUsers: 3555,
    volume: 1
  },
  {
    month: '2019-06',
    category: 'Finance',
    transactions: 207368,
    activeUsers: 66069,
    volume: 116438
  },
  {
    month: '2019-06',
    category: 'Wallet',
    transactions: 125675,
    activeUsers: 45514,
    volume: 2
  },
  {
    month: '2019-06',
    category: 'Health',
    transactions: 5,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2019-06',
    category: 'Development',
    transactions: 37545,
    activeUsers: 12400,
    volume: 98
  },
  {
    month: '2019-06',
    category: 'Marketplaces',
    transactions: 155825,
    activeUsers: 8824,
    volume: 3652
  },
  {
    month: '2019-06',
    category: 'Insurance',
    transactions: 508,
    activeUsers: 183,
    volume: 0
  },
  {
    month: '2019-06',
    category: 'Games',
    transactions: 465188,
    activeUsers: 25224,
    volume: 2334
  },
  {
    month: '2019-06',
    category: 'Governance',
    transactions: 10675,
    activeUsers: 3227,
    volume: 275
  },

  {
    month: '2019-07',
    category: 'Health',
    transactions: 17,
    activeUsers: 3,
    volume: 0
  },
  {
    month: '2019-07',
    category: 'Storage',
    transactions: 16227,
    activeUsers: 1340,
    volume: 0
  },
  {
    month: '2019-07',
    category: 'Identity',
    transactions: 3612,
    activeUsers: 1050,
    volume: 0
  },
  {
    month: '2019-07',
    category: 'High-risk',
    transactions: 16959,
    activeUsers: 4491,
    volume: 2153
  },
  {
    month: '2019-07',
    category: 'Media',
    transactions: 22560,
    activeUsers: 5609,
    volume: 5
  },
  {
    month: '2019-07',
    category: 'Games',
    transactions: 485536,
    activeUsers: 26885,
    volume: 7390
  },
  {
    month: '2019-07',
    category: 'Wallet',
    transactions: 90778,
    activeUsers: 36205,
    volume: 182
  },
  {
    month: '2019-07',
    category: 'Security',
    transactions: 73360,
    activeUsers: 26546,
    volume: 0
  },
  {
    month: '2019-07',
    category: 'Exchanges',
    transactions: 852025,
    activeUsers: 58878,
    volume: 317325
  },
  {
    month: '2019-07',
    category: 'Social',
    transactions: 26733,
    activeUsers: 4035,
    volume: 34
  },
  {
    month: '2019-07',
    category: 'Finance',
    transactions: 208310,
    activeUsers: 72343,
    volume: 247618
  },
  {
    month: '2019-07',
    category: 'Property',
    transactions: 39153,
    activeUsers: 6858,
    volume: 4
  },
  {
    month: '2019-07',
    category: 'Energy',
    transactions: 57,
    activeUsers: 47,
    volume: 0
  },
  {
    month: '2019-07',
    category: 'Gambling',
    transactions: 259182,
    activeUsers: 10485,
    volume: 84309
  },
  {
    month: '2019-07',
    category: 'Development',
    transactions: 26757,
    activeUsers: 8736,
    volume: 3
  },
  {
    month: '2019-07',
    category: 'Marketplaces',
    transactions: 141499,
    activeUsers: 5896,
    volume: 3129
  },
  {
    month: '2019-07',
    category: 'Insurance',
    transactions: 309,
    activeUsers: 145,
    volume: 0
  },
  {
    month: '2019-07',
    category: 'Governance',
    transactions: 15317,
    activeUsers: 5430,
    volume: 133
  },

  {
    month: '2019-08',
    category: 'Health',
    transactions: 1,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2019-08',
    category: 'Identity',
    transactions: 3901,
    activeUsers: 872,
    volume: 0
  },
  {
    month: '2019-08',
    category: 'Property',
    transactions: 35478,
    activeUsers: 3280,
    volume: 11
  },
  {
    month: '2019-08',
    category: 'Insurance',
    transactions: 344,
    activeUsers: 76,
    volume: 0
  },
  {
    month: '2019-08',
    category: 'High-risk',
    transactions: 18167,
    activeUsers: 5280,
    volume: 787
  },
  {
    month: '2019-08',
    category: 'Media',
    transactions: 18153,
    activeUsers: 5285,
    volume: 51
  },
  {
    month: '2019-08',
    category: 'Development',
    transactions: 24938,
    activeUsers: 6155,
    volume: 3
  },
  {
    month: '2019-08',
    category: 'Wallet',
    transactions: 78538,
    activeUsers: 31597,
    volume: 5
  },
  {
    month: '2019-08',
    category: 'Energy',
    transactions: 54,
    activeUsers: 49,
    volume: 0
  },
  {
    month: '2019-08',
    category: 'Governance',
    transactions: 7077,
    activeUsers: 2558,
    volume: 103
  },
  {
    month: '2019-08',
    category: 'Exchanges',
    transactions: 540451,
    activeUsers: 51141,
    volume: 209203
  },
  {
    month: '2019-08',
    category: 'Finance',
    transactions: 297999,
    activeUsers: 93548,
    volume: 928434
  },
  {
    month: '2019-08',
    category: 'Games',
    transactions: 484842,
    activeUsers: 31259,
    volume: 5531
  },
  {
    month: '2019-08',
    category: 'Gambling',
    transactions: 290200,
    activeUsers: 7566,
    volume: 68773
  },
  {
    month: '2019-08',
    category: 'Security',
    transactions: 52980,
    activeUsers: 17860,
    volume: 0
  },
  {
    month: '2019-08',
    category: 'Marketplaces',
    transactions: 128779,
    activeUsers: 6036,
    volume: 3537
  },
  {
    month: '2019-08',
    category: 'Storage',
    transactions: 15142,
    activeUsers: 1474,
    volume: 0
  },
  {
    month: '2019-08',
    category: 'Social',
    transactions: 23379,
    activeUsers: 4960,
    volume: 23
  },

  {
    month: '2019-09',
    category: 'Health',
    transactions: 15,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2019-09',
    category: 'Energy',
    transactions: 49,
    activeUsers: 41,
    volume: 0
  },
  {
    month: '2019-09',
    category: 'Social',
    transactions: 31452,
    activeUsers: 5871,
    volume: 27
  },
  {
    month: '2019-09',
    category: 'Storage',
    transactions: 11488,
    activeUsers: 971,
    volume: 0
  },
  {
    month: '2019-09',
    category: 'Identity',
    transactions: 5118,
    activeUsers: 865,
    volume: 0
  },
  {
    month: '2019-09',
    category: 'High-risk',
    transactions: 24038,
    activeUsers: 3543,
    volume: 4145
  },
  {
    month: '2019-09',
    category: 'Security',
    transactions: 52525,
    activeUsers: 18472,
    volume: 0
  },
  {
    month: '2019-09',
    category: 'Gambling',
    transactions: 224403,
    activeUsers: 14177,
    volume: 193303
  },
  {
    month: '2019-09',
    category: 'Exchanges',
    transactions: 432591,
    activeUsers: 43501,
    volume: 240823
  },
  {
    month: '2019-09',
    category: 'Games',
    transactions: 229434,
    activeUsers: 19965,
    volume: 3754
  },
  {
    month: '2019-09',
    category: 'Media',
    transactions: 16062,
    activeUsers: 6499,
    volume: 39
  },
  {
    month: '2019-09',
    category: 'Wallet',
    transactions: 55858,
    activeUsers: 21798,
    volume: 47
  },
  {
    month: '2019-09',
    category: 'Development',
    transactions: 23668,
    activeUsers: 5460,
    volume: 18
  },
  {
    month: '2019-09',
    category: 'Governance',
    transactions: 6394,
    activeUsers: 1691,
    volume: 67
  },
  {
    month: '2019-09',
    category: 'Finance',
    transactions: 264950,
    activeUsers: 73588,
    volume: 794553
  },
  {
    month: '2019-09',
    category: 'Marketplaces',
    transactions: 91268,
    activeUsers: 9709,
    volume: 4479
  },
  {
    month: '2019-09',
    category: 'Insurance',
    transactions: 242,
    activeUsers: 30,
    volume: 0
  },
  {
    month: '2019-09',
    category: 'Property',
    transactions: 12447,
    activeUsers: 2210,
    volume: 318
  },

  {
    month: '2019-10',
    category: 'Energy',
    transactions: 66,
    activeUsers: 43,
    volume: 0
  },
  {
    month: '2019-10',
    category: 'Health',
    transactions: 35,
    activeUsers: 2,
    volume: 0
  },
  {
    month: '2019-10',
    category: 'Identity',
    transactions: 3929,
    activeUsers: 859,
    volume: 0
  },
  {
    month: '2019-10',
    category: 'Gambling',
    transactions: 307661,
    activeUsers: 37201,
    volume: 180113
  },
  {
    month: '2019-10',
    category: 'Development',
    transactions: 32881,
    activeUsers: 9098,
    volume: 3
  },
  {
    month: '2019-10',
    category: 'Games',
    transactions: 514826,
    activeUsers: 22591,
    volume: 7728
  },
  {
    month: '2019-10',
    category: 'Governance',
    transactions: 6332,
    activeUsers: 1568,
    volume: 42
  },
  {
    month: '2019-10',
    category: 'Exchanges',
    transactions: 491780,
    activeUsers: 44420,
    volume: 296591
  },
  {
    month: '2019-10',
    category: 'Finance',
    transactions: 221829,
    activeUsers: 81568,
    volume: 256888
  },
  {
    month: '2019-10',
    category: 'Wallet',
    transactions: 63378,
    activeUsers: 23152,
    volume: 20
  },
  {
    month: '2019-10',
    category: 'Security',
    transactions: 75052,
    activeUsers: 24215,
    volume: 0
  },
  {
    month: '2019-10',
    category: 'Storage',
    transactions: 14558,
    activeUsers: 1152,
    volume: 0
  },
  {
    month: '2019-10',
    category: 'Media',
    transactions: 13387,
    activeUsers: 4074,
    volume: 1
  },
  {
    month: '2019-10',
    category: 'High-risk',
    transactions: 57074,
    activeUsers: 5855,
    volume: 12665
  },
  {
    month: '2019-10',
    category: 'Marketplaces',
    transactions: 121031,
    activeUsers: 6135,
    volume: 4576
  },
  {
    month: '2019-10',
    category: 'Property',
    transactions: 38434,
    activeUsers: 2451,
    volume: 91
  },
  {
    month: '2019-10',
    category: 'Social',
    transactions: 21239,
    activeUsers: 5029,
    volume: 48
  },

  {
    month: '2019-11',
    category: 'Health',
    transactions: 40,
    activeUsers: 2,
    volume: 0
  },
  {
    month: '2019-11',
    category: 'Property',
    transactions: 22329,
    activeUsers: 4986,
    volume: 0
  },
  {
    month: '2019-11',
    category: 'Identity',
    transactions: 3814,
    activeUsers: 1510,
    volume: 0
  },
  {
    month: '2019-11',
    category: 'Governance',
    transactions: 8032,
    activeUsers: 2562,
    volume: 29
  },
  {
    month: '2019-11',
    category: 'Development',
    transactions: 35325,
    activeUsers: 14127,
    volume: 3738
  },
  {
    month: '2019-11',
    category: 'Exchanges',
    transactions: 491193,
    activeUsers: 45859,
    volume: 389170
  },
  {
    month: '2019-11',
    category: 'Security',
    transactions: 56816,
    activeUsers: 19155,
    volume: 0
  },
  {
    month: '2019-11',
    category: 'Social',
    transactions: 17866,
    activeUsers: 4776,
    volume: 38
  },
  {
    month: '2019-11',
    category: 'Finance',
    transactions: 205673,
    activeUsers: 66508,
    volume: 139424
  },
  {
    month: '2019-11',
    category: 'Storage',
    transactions: 16614,
    activeUsers: 1382,
    volume: 0
  },
  {
    month: '2019-11',
    category: 'High-risk',
    transactions: 139323,
    activeUsers: 46282,
    volume: 1265441
  },
  {
    month: '2019-11',
    category: 'Wallet',
    transactions: 74355,
    activeUsers: 26471,
    volume: 51
  },
  {
    month: '2019-11',
    category: 'Energy',
    transactions: 57,
    activeUsers: 36,
    volume: 0
  },
  {
    month: '2019-11',
    category: 'Marketplaces',
    transactions: 127484,
    activeUsers: 9820,
    volume: 5465
  },
  {
    month: '2019-11',
    category: 'Games',
    transactions: 479481,
    activeUsers: 25213,
    volume: 1984
  },
  {
    month: '2019-11',
    category: 'Media',
    transactions: 11386,
    activeUsers: 4418,
    volume: 0
  },
  {
    month: '2019-11',
    category: 'Gambling',
    transactions: 305777,
    activeUsers: 49334,
    volume: 732291
  },

  {
    month: '2019-12',
    category: 'Health',
    transactions: 14,
    activeUsers: 1,
    volume: 0
  },
  {
    month: '2019-12',
    category: 'Governance',
    transactions: 5359,
    activeUsers: 1311,
    volume: 77
  },
  {
    month: '2019-12',
    category: 'Storage',
    transactions: 16058,
    activeUsers: 1581,
    volume: 0
  },
  {
    month: '2019-12',
    category: 'Property',
    transactions: 11693,
    activeUsers: 2244,
    volume: 1
  },
  {
    month: '2019-12',
    category: 'Development',
    transactions: 140498,
    activeUsers: 5701,
    volume: 7413
  },
  {
    month: '2019-12',
    category: 'Security',
    transactions: 46517,
    activeUsers: 15741,
    volume: 0
  },
  {
    month: '2019-12',
    category: 'Gambling',
    transactions: 229173,
    activeUsers: 20513,
    volume: 142042
  },
  {
    month: '2019-12',
    category: 'High-risk',
    transactions: 180440,
    activeUsers: 58554,
    volume: 2670595
  },
  {
    month: '2019-12',
    category: 'Wallet',
    transactions: 62235,
    activeUsers: 20803,
    volume: 326
  },
  {
    month: '2019-12',
    category: 'Finance',
    transactions: 261925,
    activeUsers: 51339,
    volume: 166298
  },
  {
    month: '2019-12',
    category: 'Exchanges',
    transactions: 440274,
    activeUsers: 40400,
    volume: 482967
  },
  {
    month: '2019-12',
    category: 'Games',
    transactions: 544753,
    activeUsers: 26214,
    volume: 2411
  },
  {
    month: '2019-12',
    category: 'Energy',
    transactions: 377,
    activeUsers: 141,
    volume: 0
  },
  {
    month: '2019-12',
    category: 'Identity',
    transactions: 2918,
    activeUsers: 749,
    volume: 1
  },
  {
    month: '2019-12',
    category: 'Marketplaces',
    transactions: 137794,
    activeUsers: 7191,
    volume: 10336
  },
  {
    month: '2019-12',
    category: 'Media',
    transactions: 11240,
    activeUsers: 2085,
    volume: 1
  },
  {
    month: '2019-12',
    category: 'Social',
    transactions: 12354,
    activeUsers: 3046,
    volume: 604
  },
  {
    month: '2020-01',
    category: 'Finance',
    transactions: 979762,
    activeUsers: 248211,
    volume: 476453
  },
  {
    month: '2020-01',
    category: 'Marketplaces',
    transactions: 162864,
    activeUsers: 14575,
    volume: 11133
  },
  {
    month: '2020-01',
    category: 'Storage',
    transactions: 18423,
    activeUsers: 1734,
    volume: 0
  },
  {
    month: '2020-01',
    category: 'Games',
    transactions: 655072,
    activeUsers: 28541,
    volume: 3876
  },
  {
    month: '2020-01',
    category: 'Identity',
    transactions: 2148,
    activeUsers: 620,
    volume: 0
  },
  {
    month: '2020-01',
    category: 'Social',
    transactions: 14453,
    activeUsers: 3750,
    volume: 103
  },
  {
    month: '2020-01',
    category: 'Property',
    transactions: 18868,
    activeUsers: 3057,
    volume: 0
  },
  {
    month: '2020-01',
    category: 'health',
    transactions: 10,
    activeUsers: 2,
    volume: 0
  },
  {
    month: '2020-01',
    category: 'High-risk',
    transactions: 104896,
    activeUsers: 34470,
    volume: 1583762
  },
  {
    month: '2020-01',
    category: 'Governance',
    transactions: 6428,
    activeUsers: 2269,
    volume: 22
  },
  {
    month: '2020-01',
    category: 'Security',
    transactions: 62889,
    activeUsers: 19957,
    volume: 0
  },
  {
    month: '2020-01',
    category: 'Energy',
    transactions: 294,
    activeUsers: 143,
    volume: 0
  },
  {
    month: '2020-01',
    category: 'Exchanges',
    transactions: 581293,
    activeUsers: 51652,
    volume: 462404
  },
  {
    month: '2020-01',
    category: 'Development',
    transactions: 31739,
    activeUsers: 6539,
    volume: 8832
  },
  {
    month: '2020-01',
    category: 'Wallet',
    transactions: 67351,
    activeUsers: 23664,
    volume: 613
  },
  {
    month: '2020-01',
    category: 'Media',
    transactions: 15967,
    activeUsers: 2734,
    volume: 10
  },
  {
    month: '2020-01',
    category: 'Gambling',
    transactions: 266175,
    activeUsers: 22165,
    volume: 209681
  },
  {
    month: '2020-02',
    category: 'Media',
    transactions: 15204,
    activeUsers: 3444,
    volume: 122
  },
  {
    month: '2020-02',
    category: 'Energy',
    transactions: 468,
    activeUsers: 182,
    volume: 0
  },
  {
    month: '2020-02',
    category: 'Gambling',
    transactions: 196242,
    activeUsers: 10560,
    volume: 137126
  },
  {
    month: '2020-02',
    category: 'Governance',
    transactions: 10488,
    activeUsers: 4276,
    volume: 16
  },
  {
    month: '2020-02',
    category: 'Storage',
    transactions: 28103,
    activeUsers: 2829,
    volume: 0
  },
  {
    month: '2020-02',
    category: 'Finance',
    transactions: 363564,
    activeUsers: 86855,
    volume: 550721
  },
  {
    month: '2020-02',
    category: 'Development',
    transactions: 49339,
    activeUsers: 10792,
    volume: 10384
  },
  {
    month: '2020-02',
    category: 'Exchanges',
    transactions: 642812,
    activeUsers: 67245,
    volume: 569051
  },
  {
    month: '2020-02',
    category: 'High-risk',
    transactions: 26196,
    activeUsers: 7265,
    volume: 521
  },
  {
    month: '2020-02',
    category: 'Social',
    transactions: 28693,
    activeUsers: 6208,
    volume: 28
  },
  {
    month: '2020-02',
    category: 'Property',
    transactions: 42225,
    activeUsers: 12108,
    volume: 2
  },
  {
    month: '2020-02',
    category: 'Marketplaces',
    transactions: 153837,
    activeUsers: 31996,
    volume: 7979
  },
  {
    month: '2020-02',
    category: 'Wallet',
    transactions: 105068,
    activeUsers: 35488,
    volume: 829
  },
  {
    month: '2020-02',
    category: 'Identity',
    transactions: 4191,
    activeUsers: 1487,
    volume: 0
  },
  {
    month: '2020-02',
    category: 'Games',
    transactions: 575342,
    activeUsers: 31609,
    volume: 3959
  },
  {
    month: '2020-02',
    category: 'Security',
    transactions: 107518,
    activeUsers: 35179,
    volume: 0
  },
  {
    month: '2020-02',
    category: 'health',
    transactions: 17,
    activeUsers: 8,
    volume: 0
  },
  {
    month: '2020-03',
    category: 'Storage',
    transactions: 52013,
    activeUsers: 2963,
    volume: 0
  },
  {
    month: '2020-03',
    category: 'Exchanges',
    transactions: 638746,
    activeUsers: 67517,
    volume: 1151800
  },
  {
    month: '2020-03',
    category: 'Wallet',
    transactions: 101810,
    activeUsers: 28464,
    volume: 338
  },
  {
    month: '2020-03',
    category: 'High-risk',
    transactions: 78478,
    activeUsers: 39552,
    volume: 24079
  },
  {
    month: '2020-03',
    category: 'Finance',
    transactions: 435552,
    activeUsers: 97068,
    volume: 897762
  },
  {
    month: '2020-03',
    category: 'Gambling',
    transactions: 259681,
    activeUsers: 15899,
    volume: 183216
  },
  {
    month: '2020-03',
    category: 'Games',
    transactions: 534322,
    activeUsers: 27664,
    volume: 3573
  },
  {
    month: '2020-03',
    category: 'Marketplaces',
    transactions: 130600,
    activeUsers: 9491,
    volume: 9659
  },
  {
    month: '2020-03',
    category: 'Identity',
    transactions: 1933,
    activeUsers: 523,
    volume: 0
  },
  {
    month: '2020-03',
    category: 'Social',
    transactions: 31317,
    activeUsers: 5096,
    volume: 90
  },
  {
    month: '2020-03',
    category: 'health',
    transactions: 14,
    activeUsers: 7,
    volume: 0
  },
  {
    month: '2020-03',
    category: 'Media',
    transactions: 11019,
    activeUsers: 3159,
    volume: 4
  },
  {
    month: '2020-03',
    category: 'Development',
    transactions: 46943,
    activeUsers: 11388,
    volume: 15810
  },
  {
    month: '2020-03',
    category: 'Property',
    transactions: 25525,
    activeUsers: 5046,
    volume: 0
  },
  {
    month: '2020-03',
    category: 'Security',
    transactions: 131828,
    activeUsers: 40967,
    volume: 20
  },
  {
    month: '2020-03',
    category: 'Governance',
    transactions: 6955,
    activeUsers: 2637,
    volume: 1
  },
  {
    month: '2020-03',
    category: 'Energy',
    transactions: 428,
    activeUsers: 162,
    volume: 0
  },
  {
    month: '2020-04',
    category: 'Energy',
    transactions: 773,
    activeUsers: 264,
    volume: 0
  },
  {
    month: '2020-04',
    category: 'Security',
    transactions: 125301,
    activeUsers: 40829,
    volume: 0
  },
  {
    month: '2020-04',
    category: 'Governance',
    transactions: 5786,
    activeUsers: 2069,
    volume: 39
  },
  {
    month: '2020-04',
    category: 'Development',
    transactions: 33429,
    activeUsers: 6678,
    volume: 44601
  },
  {
    month: '2020-04',
    category: 'Storage',
    transactions: 52244,
    activeUsers: 2822,
    volume: 0
  },
  {
    month: '2020-04',
    category: 'Marketplaces',
    transactions: 106044,
    activeUsers: 9313,
    volume: 9046
  },
  {
    month: '2020-04',
    category: 'Exchanges',
    transactions: 526371,
    activeUsers: 64729,
    volume: 721194
  },
  {
    month: '2020-04',
    category: 'Finance',
    transactions: 407311,
    activeUsers: 94671,
    volume: 466621
  },
  {
    month: '2020-04',
    category: 'Property',
    transactions: 21179,
    activeUsers: 4109,
    volume: 0
  },
  {
    month: '2020-04',
    category: 'Media',
    transactions: 9713,
    activeUsers: 1806,
    volume: 3
  },
  {
    month: '2020-04',
    category: 'Social',
    transactions: 36037,
    activeUsers: 5467,
    volume: 92
  },
  {
    month: '2020-04',
    category: 'Games',
    transactions: 443809,
    activeUsers: 24897,
    volume: 2904
  },
  {
    month: '2020-04',
    category: 'Identity',
    transactions: 2051,
    activeUsers: 552,
    volume: 0
  },
  {
    month: '2020-04',
    category: 'health',
    transactions: 17,
    activeUsers: 7,
    volume: 0
  },
  {
    month: '2020-04',
    category: 'Wallet',
    transactions: 102368,
    activeUsers: 30924,
    volume: 1472
  },
  {
    month: '2020-04',
    category: 'Gambling',
    transactions: 233692,
    activeUsers: 22227,
    volume: 95003
  },
  {
    month: '2020-04',
    category: 'High-risk',
    transactions: 343960,
    activeUsers: 160070,
    volume: 196524
  },
  {
    month: '2020-05',
    category: 'Gambling',
    transactions: 207994,
    activeUsers: 11572,
    volume: 90741
  },
  {
    month: '2020-05',
    category: 'Governance',
    transactions: 7387,
    activeUsers: 2440,
    volume: 70
  },
  {
    month: '2020-05',
    category: 'Wallet',
    transactions: 132615,
    activeUsers: 38570,
    volume: 1214
  },
  {
    month: '2020-05',
    category: 'Marketplaces',
    transactions: 92864,
    activeUsers: 8036,
    volume: 12024
  },
  {
    month: '2020-05',
    category: 'Identity',
    transactions: 3150,
    activeUsers: 590,
    volume: 0
  },
  {
    month: '2020-05',
    category: 'Media',
    transactions: 11633,
    activeUsers: 2854,
    volume: 6
  },
  {
    month: '2020-05',
    category: 'Finance',
    transactions: 496310,
    activeUsers: 106961,
    volume: 474747
  },
  {
    month: '2020-05',
    category: 'Social',
    transactions: 27286,
    activeUsers: 6400,
    volume: 55
  },
  {
    month: '2020-05',
    category: 'Games',
    transactions: 206233,
    activeUsers: 29486,
    volume: 3064
  },
  {
    month: '2020-05',
    category: 'Energy',
    transactions: 463,
    activeUsers: 200,
    volume: 0
  },
  {
    month: '2020-05',
    category: 'Storage',
    transactions: 71563,
    activeUsers: 3596,
    volume: 0
  },
  {
    month: '2020-05',
    category: 'Security',
    transactions: 123890,
    activeUsers: 46961,
    volume: 0
  },
  {
    month: '2020-05',
    category: 'Development',
    transactions: 48528,
    activeUsers: 9632,
    volume: 80799
  },
  {
    month: '2020-05',
    category: 'health',
    transactions: 10,
    activeUsers: 7,
    volume: 0
  },
  {
    month: '2020-05',
    category: 'High-risk',
    transactions: 471074,
    activeUsers: 190572,
    volume: 548512
  },
  {
    month: '2020-05',
    category: 'Exchanges',
    transactions: 788325,
    activeUsers: 96344,
    volume: 986265
  },
  {
    month: '2020-05',
    category: 'Property',
    transactions: 26183,
    activeUsers: 5428,
    volume: 0
  },
  {
    month: '2020-06',
    category: 'Media',
    transactions: 11757,
    activeUsers: 3341,
    volume: 7
  },
  {
    month: '2020-06',
    category: 'High-risk',
    transactions: 873241,
    activeUsers: 332622,
    volume: 467644
  },
  {
    month: '2020-06',
    category: 'Energy',
    transactions: 343,
    activeUsers: 230,
    volume: 0
  },
  {
    month: '2020-06',
    category: 'Marketplaces',
    transactions: 66990,
    activeUsers: 8439,
    volume: 7683
  },
  {
    month: '2020-06',
    category: 'Governance',
    transactions: 4713,
    activeUsers: 1975,
    volume: 0
  },
  {
    month: '2020-06',
    category: 'Social',
    transactions: 17317,
    activeUsers: 4724,
    volume: 70
  },
  {
    month: '2020-06',
    category: 'Gambling',
    transactions: 159125,
    activeUsers: 5932,
    volume: 57288
  },
  {
    month: '2020-06',
    category: 'Security',
    transactions: 124863,
    activeUsers: 49287,
    volume: 0
  },
  {
    month: '2020-06',
    category: 'Finance',
    transactions: 525230,
    activeUsers: 117300,
    volume: 2205891
  },
  {
    month: '2020-06',
    category: 'Development',
    transactions: 49983,
    activeUsers: 8506,
    volume: 69508
  },
  {
    month: '2020-06',
    category: 'health',
    transactions: 9,
    activeUsers: 6,
    volume: 0
  },
  {
    month: '2020-06',
    category: 'Exchanges',
    transactions: 610752,
    activeUsers: 90415,
    volume: 768028
  },
  {
    month: '2020-06',
    category: 'Wallet',
    transactions: 163892,
    activeUsers: 61607,
    volume: 3008
  },
  {
    month: '2020-06',
    category: 'Games',
    transactions: 118770,
    activeUsers: 16813,
    volume: 2680
  },
  {
    month: '2020-06',
    category: 'Identity',
    transactions: 2016,
    activeUsers: 476,
    volume: 0
  },
  {
    month: '2020-06',
    category: 'Property',
    transactions: 12136,
    activeUsers: 3529,
    volume: 0
  },
  {
    month: '2020-06',
    category: 'Storage',
    transactions: 83534,
    activeUsers: 3625,
    volume: 0
  },
  {
    month: '2020-07',
    category: 'Gambling',
    transactions: 142115,
    activeUsers: 4295,
    volume: 48953
  },
  {
    month: '2020-07',
    category: 'Marketplaces',
    transactions: 65629,
    activeUsers: 9449,
    volume: 8763
  },
  {
    month: '2020-07',
    category: 'Social',
    transactions: 15200,
    activeUsers: 4755,
    volume: 35
  },
  {
    month: '2020-07',
    category: 'Identity',
    transactions: 7157,
    activeUsers: 945,
    volume: 0
  },
  {
    month: '2020-07',
    category: 'Media',
    transactions: 13602,
    activeUsers: 3639,
    volume: 10
  },
  {
    month: '2020-07',
    category: 'High-risk',
    transactions: 1264207,
    activeUsers: 459563,
    volume: 634867
  },
  {
    month: '2020-07',
    category: 'Wallet',
    transactions: 172977,
    activeUsers: 49665,
    volume: 3656
  },
  {
    month: '2020-07',
    category: 'Development',
    transactions: 35259,
    activeUsers: 9913,
    volume: 48140
  },
  {
    month: '2020-07',
    category: 'Governance',
    transactions: 12617,
    activeUsers: 4283,
    volume: 32
  },
  {
    month: '2020-07',
    category: 'Games',
    transactions: 126381,
    activeUsers: 21963,
    volume: 4915
  },
  {
    month: '2020-07',
    category: 'Finance',
    transactions: 526745,
    activeUsers: 133923,
    volume: 2265048
  },
  {
    month: '2020-07',
    category: 'health',
    transactions: 8,
    activeUsers: 6,
    volume: 0
  },
  {
    month: '2020-07',
    category: 'Property',
    transactions: 14922,
    activeUsers: 4326,
    volume: 0
  },
  {
    month: '2020-07',
    category: 'Exchanges',
    transactions: 757369,
    activeUsers: 125983,
    volume: 953643
  },
  {
    month: '2020-07',
    category: 'Storage',
    transactions: 41081,
    activeUsers: 4005,
    volume: 0
  },
  {
    month: '2020-07',
    category: 'Security',
    transactions: 266250,
    activeUsers: 107870,
    volume: 2
  },
  {
    month: '2020-07',
    category: 'Energy',
    transactions: 2134,
    activeUsers: 1239,
    volume: 0
  },
  {
    month: '2020-08',
    category: 'High-risk',
    transactions: 757779,
    activeUsers: 246319,
    volume: 382292
  },
  {
    month: '2020-08',
    category: 'Finance',
    transactions: 489150,
    activeUsers: 132918,
    volume: 3660544
  },
  {
    month: '2020-08',
    category: 'Storage',
    transactions: 33682,
    activeUsers: 8206,
    volume: 0
  },
  {
    month: '2020-08',
    category: 'Identity',
    transactions: 8472,
    activeUsers: 1539,
    volume: 0
  },
  {
    month: '2020-08',
    category: 'health',
    transactions: 34,
    activeUsers: 30,
    volume: 0
  },
  {
    month: '2020-08',
    category: 'Social',
    transactions: 20871,
    activeUsers: 6556,
    volume: 4
  },
  {
    month: '2020-08',
    category: 'Property',
    transactions: 28349,
    activeUsers: 6697,
    volume: 1
  },
  {
    month: '2020-08',
    category: 'Energy',
    transactions: 958,
    activeUsers: 638,
    volume: 0
  },
  {
    month: '2020-08',
    category: 'Media',
    transactions: 11607,
    activeUsers: 4428,
    volume: 10
  },
  {
    month: '2020-08',
    category: 'Wallet',
    transactions: 163668,
    activeUsers: 47259,
    volume: 2645
  },
  {
    month: '2020-08',
    category: 'Marketplaces',
    transactions: 46732,
    activeUsers: 10891,
    volume: 6658
  },
  {
    month: '2020-08',
    category: 'Gambling',
    transactions: 111891,
    activeUsers: 3479,
    volume: 157080
  },
  {
    month: '2020-08',
    category: 'Games',
    transactions: 91501,
    activeUsers: 20149,
    volume: 2727
  },
  {
    month: '2020-08',
    category: 'Development',
    transactions: 52808,
    activeUsers: 18412,
    volume: 7
  },
  {
    month: '2020-08',
    category: 'Security',
    transactions: 417420,
    activeUsers: 159613,
    volume: 2
  },
  {
    month: '2020-08',
    category: 'Exchanges',
    transactions: 657680,
    activeUsers: 123296,
    volume: 1209057
  },
  {
    month: '2020-08',
    category: 'Governance',
    transactions: 34567,
    activeUsers: 10258,
    volume: 58
  },
  {
    month: '2020-09',
    category: 'Exchanges',
    transactions: 468120,
    activeUsers: 110326,
    volume: 1408025
  },
  {
    month: '2020-09',
    category: 'health',
    transactions: 8,
    activeUsers: 6,
    volume: 0
  },
  {
    month: '2020-09',
    category: 'Security',
    transactions: 227488,
    activeUsers: 83756,
    volume: 9
  },
  {
    month: '2020-09',
    category: 'Governance',
    transactions: 14248,
    activeUsers: 5645,
    volume: 80
  },
  {
    month: '2020-09',
    category: 'Property',
    transactions: 9987,
    activeUsers: 3522,
    volume: 23
  },
  {
    month: '2020-09',
    category: 'High-risk',
    transactions: 229151,
    activeUsers: 63953,
    volume: 228184
  },
  {
    month: '2020-09',
    category: 'Wallet',
    transactions: 126123,
    activeUsers: 33143,
    volume: 1857
  },
  {
    month: '2020-09',
    category: 'Finance',
    transactions: 597034,
    activeUsers: 139491,
    volume: 7765649
  },
  {
    month: '2020-09',
    category: 'Development',
    transactions: 53876,
    activeUsers: 21643,
    volume: 180
  },
  {
    month: '2020-09',
    category: 'Gambling',
    transactions: 50931,
    activeUsers: 1766,
    volume: 244514
  },
  {
    month: '2020-09',
    category: 'Social',
    transactions: 28204,
    activeUsers: 6814,
    volume: 6
  },
  {
    month: '2020-09',
    category: 'Energy',
    transactions: 468,
    activeUsers: 327,
    volume: 0
  },
  {
    month: '2020-09',
    category: 'Marketplaces',
    transactions: 60580,
    activeUsers: 10385,
    volume: 19284
  },
  {
    month: '2020-09',
    category: 'Media',
    transactions: 5416,
    activeUsers: 2439,
    volume: 10
  },
  {
    month: '2020-09',
    category: 'Storage',
    transactions: 17107,
    activeUsers: 4959,
    volume: 0
  },
  {
    month: '2020-09',
    category: 'Identity',
    transactions: 3201,
    activeUsers: 1287,
    volume: 0
  },
  {
    month: '2020-09',
    category: 'Games',
    transactions: 100071,
    activeUsers: 20082,
    volume: 6060
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
                  display: true
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
  top: 75px;
  right: 30px;
}
</style>
