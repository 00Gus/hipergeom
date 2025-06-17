function combinatoria(n, k) {
  if (k > n) return 0;
  let res = 1;
  for (let i = 1; i <= k; i++) {
    res *= (n - i + 1) / i;
  }
  return res;
}

function hipergeometrica(N, K, n, k) {
  return (combinatoria(K, k) * combinatoria(N - K, n - k)) / combinatoria(N, n);
}

function calcular() {
  const N = parseInt(document.getElementById("total").value);
  const K = parseInt(document.getElementById("premiados").value);
  const n = parseInt(document.getElementById("comprados").value);

  const probs = [];
  const labels = [];

  for (let k = 0; k <= n; k++) {
    const p = hipergeometrica(N, K, n, k);
    labels.push(`${k} premios`);
    probs.push(p);
  }

  mostrarGrafica(labels, probs);
  mostrarExplicacion(N, K, n, probs);
}

let chartInstance;

function mostrarGrafica(labels, data) {
  const ctx = document.getElementById("grafica").getContext("2d");
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Probabilidad',
        data: data,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 1,
          ticks: {
            callback: function(value) {
              return (value * 100).toFixed(0) + '%';
            }
          }
        }
      }
    }
  });
}

function mostrarExplicacion(N, K, n, probs) {
  let explicacion = `
    <h2 class="text-xl font-semibold mb-2">📘 Explicación:</h2>
    <p>En una tómbola con <strong>${N}</strong> boletos, donde <strong>${K}</strong> están premiados, 
    una persona compra <strong>${n}</strong> boletos sin reemplazo.</p>
    <p>Se utiliza la <strong>distribución hipergeométrica</strong> para calcular la probabilidad de obtener cierto número de boletos premiados.</p>
    <p><em>Fórmula:</em> <code>P(X = k) = [C(K, k) * C(N-K, n-k)] / C(N, n)</code></p>
    <ul class="mt-2 list-disc pl-5 text-gray-800">`;

  for (let i = 0; i <= n; i++) {
    explicacion += `<li>P(X = ${i}) = ${probs[i].toFixed(5)}</li>`;
  }

  explicacion += `</ul>`;
  document.getElementById("explicacion").innerHTML = explicacion;
}
