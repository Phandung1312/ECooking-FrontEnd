<template>
  <div :class="['p-4 rounded-lg shadow', { [`bg-${bgColor}-100`]: bgColor }]">
    <div
      :class="[
        'rounded-full overflow-hidden p-2 inline-block',
        { [`bg-${bgColor}-400`]: bgColor },
      ]"
    >
      <span
        class="material-icons text-white text-3xl w-12 h-12 flex items-center justify-center"
        >{{ icon }}</span
      >
    </div>
    <div class="value text-2xl font-bold mb-4">{{ value }}</div>
    <div class="title text-lg font-semibold mb-2">{{ title }}</div>
    <div class="">
      <span
        :class="[
          'text-sm',
          {
            'text-green-500': isPositiveChange,
            'text-red-500': isNegativeChange,
          },
        ]"
      >
        {{ changeValue }} % from last month
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: String,
    icon: String,
    changeValue: String,
    bgColor: String,
  },
  computed: {
    isPositiveChange() {
      return parseFloat(this.changeValue) > 0;
    },
    isNegativeChange() {
      return parseFloat(this.changeValue) < 0;
    },
  },
};
</script>
