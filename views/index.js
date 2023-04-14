const socket = io();

socket.on("msg-list", (data) => {
  console.log("data", data);
  let html = "";
  data.forEach((obj) => {
    html += `
    <div>
      <p><b style="color:blue;">${obj.email}</b> <b style="color:red;">[${obj.fecha}]</b> <i style="color:green;">${obj.mensaje}</i></p>
    </div>
    `;
  });
  document.getElementById("div-list-msgs").innerHTML = html;
});

const enviarMsg = () => {
  const msgParaEnvio = document.getElementById("input-msg").value;
  const email = document.getElementById("input-email").value;

  console.log(msgParaEnvio);
  console.log(email);

  socket.emit("msg", {
    email: email,
    mensaje: msgParaEnvio,
  });
};
