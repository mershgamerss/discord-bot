// Importa librerías
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

// Configura Express para keep-alive
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Bot activo');
});

app.listen(PORT, () => {
  console.log(`Servidor Express activo en puerto ${PORT}`);
});

// Configura cliente Discord con permisos necesarios
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('clientReady', () => {
  console.log(`✅ Bot listo como ${client.user.tag}`);
});

// Evento: Usuario nuevo entra → asignar rol Equipo aleatorio
client.on('guildMemberAdd', async (member) => {
  try {
    // Filtra roles que empiecen por "Equipo "
    const rolesEquipo = member.guild.roles.cache.filter(r => r.name.startsWith("Equipo "));
    if (rolesEquipo.size === 0) {
      console.log("⚠️ No hay roles de equipo creados en el servidor.");
      return;
    }

    // Elige rol aleatorio Equipo
    const rolesArray = Array.from(rolesEquipo.values());
    const randomRole = rolesArray[Math.floor(Math.random() * rolesArray.length)];

    // Asigna el rol al nuevo miembro
    await member.roles.add(randomRole);
    console.log(`🎯 Asignado rol aleatorio ${randomRole.name} a ${member.user.tag}`);

  } catch (error) {
    console.error('❌ Error asignando rol de equipo:', error);
  }
});

// Evento: Usuario cambia roles → si recibe un rol Capitán, quita roles Equipo
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  try {
    // Detecta si recibió un nuevo rol que empieza con "Capitán"
    const tieneNuevoRolCapitan =
      newMember.roles.cache.some(r => r.name.startsWith("Capitán")) &&
      !oldMember.roles.cache.some(r => r.name.startsWith("Capitán"));

    if (tieneNuevoRolCapitan) {
      // Quita todos los roles que empiecen por "Equipo "
      const rolesEquipo = newMember.roles.cache.filter(r => r.name.startsWith("Equipo "));
      for (const role of rolesEquipo.values()) {
        await newMember.roles.remove(role);
        console.log(`🚫 Quitado ${role.name} a ${newMember.user.tag} (ahora Capitán)`);
      }
    }
  } catch (error) {
    console.error('❌ Error gestionando actualización de roles:', error);
  }
});

// Login con token desde variable de entorno
client.login(process.env.DISCORD_TOKEN);
