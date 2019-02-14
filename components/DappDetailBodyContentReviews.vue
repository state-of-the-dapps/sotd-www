<template>
  <div class="DappDetailBodyContentReviews">
    <h3 class="section-title">{{ $t(namespace('critic')) }}</h3>
    <ul class="review-list">
      <li
        v-for="(review, index) in reviews"
        :key="index"
        class="review-item"
      >
        <h4 class="title">
          <a
            :href="review.review_url"
            target="_blank"
            class="link"
            @click="$mixpanel.track('Critic Review', { dapp: review.slug, link: 'title' })">{{ review.title }}</a>
          <p class="author-date">
            {{ $t(namespace('reviewBy')) }} <strong>{{ review.author }}</strong>, on {{ review.created | formatDate('MMM D, YYYY') }}
          </p>
        </h4>
        <p class="summary">
          {{ review.summary }}
        </p>
        <p class="cta-wrapper">
          <a
            :href="review.review_url"
            class="cta"
            target="_blank"
            @click="$mixpanel.track('Critic Review', { dapp: review.slug, link: 'button' })"
          >{{ $t(namespace('readMore')) }}</a>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      default: () => []
    }
  }
}
</script>


<style lang="scss" scoped>
.DappDetailBodyContentReviews {
  margin: 20px 10px;
}

.cta {
  @include button;
  padding: 3px 12px;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 700;
}

.cta-wrapper {
  margin-bottom: 0;
}

.author-date {
  @include font-text;
  margin: 0;
  font-size: 1rem;
}

.link {
  text-decoration: none;
}

.review-item {
  margin-top: 20px;
  background: lighten($color--gray, 3%);
  padding: 20px;
}

.section-title {
  @include title-2;
  margin-top: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid $color--gray;
}

.summary {
  line-height: 1.35;
}

.title {
  @include title-2;
  font-size: 1.85rem;
  margin: 0;
  margin-bottom: 15px;
  padding-bottom: 25px;
  border-bottom: 1px solid darken($color--gray, 12%);
  position: relative;
  font-size: 1.8rem;
  &:before {
    content: '';
    position: absolute;
    width: 22px;
    height: 22px;
    background: lighten($color--gray, 3%);
    left: 15px;
    bottom: -11px;
    border-top: 1px solid darken($color--gray, 12%);
    border-left: 1px solid darken($color--gray, 12%);
    transform: rotate(45deg);
  }
}
</style>
