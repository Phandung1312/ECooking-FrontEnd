<template>
  <div class="h-full">
    <canvas ref="barChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

export default {
  name: "BarChart",
  setup() {
    const profitData = ref({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Sales",
          backgroundColor: "#d1fae5",
          borderColor: "#4ade80",
          borderWidth: 1,
          data: [2000, 2500, 1800, 3000, 2200, 3000, 3500],
        },
        {
          label: "Revenue",
          backgroundColor: "#fef9c3",
          borderColor: "#facc15",
          borderWidth: 1,
          data: [1500, 1800, 1200, 2000, 1600, 3000, 2500],
        },
      ],
    });

    const barChart = ref(null);

    onMounted(() => {
      renderChart();
    });

    const renderChart = () => {
      const ctx = barChart.value.getContext('2d');
      Chart.register(...registerables);
      new Chart(ctx, {
        type: 'bar',
        data: profitData.value,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    };

    return {
      barChart,
      renderChart,
    };
  },
};
</script>

<style scoped>
</style>
