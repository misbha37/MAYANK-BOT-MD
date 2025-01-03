const {
    Sparky,
    isPublic
} = require("../lib/plugins.js");
let gis = require("g-i-s");
const axios = require('axios');
const fetch = require('node-fetch');
const {
    API
} = require("../config.js");
Sparky(
    {
        name: "insta",
        fromMe: isPublic,
        desc: "Instagram downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
        if (!args) return await m.reply("_Enter Link_");
        let dl = await client.sendMessage(m.jid, {
            text: "_Downloading..._"
        }, {
            quoted: m
        })
        try {
            const res = await axios.get(`${API}/api/downloader/igdl?url=${args}`)
            let response = await res.data
            for (let i of response.data) {
                await m.sendMsg(m.jid, i.url, { quoted: m }, i.type)
            }
        } catch (e) {
            client.sendMessage(m.jid, {
                text: `_Error_`, edit: dl.key
            })
        }
    }
);

Sparky(
    {
        name: "story",
        fromMe: isPublic,
        desc: "Instagram story downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
        if (!args) return await m.reply("_Enter Link_");
        let dl = await client.sendMessage(m.jid, {
            text: "_Just a moment..._"
        }, {
            quoted: m
        })

        let url = args
        let res = await axios.get(`${API}/api/downloader/story?url=${url}`)
        let response = await res.data
        let data = response.data[0]
        let datai = `Total Stories\nUrl : ${url}\n\n`
        for (let i = 1; i < response.data.length + 1; i++) {
            datai += `_${i} . ${i}/${response.data.length} - ${response.data[i - 1].type}_\n`
        }
        datai += '\nReply with Number'
        m.sendMsg(m.jid, datai, {
            edit: dl.key
        })
    }
);

////////////
Sparky(
    {
        name: "yt",
        fromMe: isPublic,
        desc: "Select video quality to get the download link",
        category: "downloader",
    },
    async ({ m, client, args }) => {
        try {
            args = args || m.quoted?.text;
            if (!args) return await m.reply("_Enter Link Or Reply To a Link_");
            let url = args
            m.reply("_Please hold on This May Take Sometime._");
            let sample = await fetch(`https://api.gifted.my.id/api/v1/ytdl?query=${url}`);
            let data = await sample.json();
            let mediaList = data.data.media;

            let dl = await client.sendMessage(m.jid, { text: 'Processing your download options...' }, { quoted: m });

            let datai = `_*YouTube Downloader*_\nUrl : ${url}\n\n`
            for (let i = 1; i < mediaList.length + 1; i++) {
                datai += `_${i} . ${mediaList[i - 1].type} - ${mediaList[i - 1].quality}_\n`
            }
            datai += '\nReply with Number'
            m.sendMsg(m.jid, datai, {
                edit: dl.key
            })
        } catch (e) {
            await m.reply(`Error: ${e.message}`);
        }
    }
);

/////////////


Sparky(
    {
        name: "img",
        fromMe: isPublic,
        desc: "Google Image search",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        try {
            async function gimage(query, amount = 5) {
                let list = [];
                return new Promise((resolve, reject) => {
                    gis(query, async (error, result) => {
                        for (
                            var i = 0;
                            i < (result.length < amount ? result.length : amount);
                            i++
                        ) {
                            list.push(result[i].url);
                            resolve(list);
                        }
                    });
                });
            }
            if (!args) return await m.reply("_Enter Query,Number_");
            let [query,
                amount] = args.split(",");
            let result = await gimage(query, amount);
            await m.reply(
                `_Downloading ${amount || 5} images for ${query}_`
            );
            for (let i of result) {
                await m.sendMsg(m.jid, i, {}, "image")
            }

        } catch (e) {
            console.log(e)
        }
    }
);


Sparky(
    {
        name: "gdrive",
        fromMe: isPublic,
        desc: "Instagram story downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
        if (!args) return await m.reply("_Enter Link_");
        var document = await fetch(`${API}/api/downloader/gdrive?url=${args}`);
        var zip = await document.json();
        client.sendMessage(m.jid, { document: { url: zip.data.downloadUrl }, fileName: `${zip.data.fileName}`, mimetype: "application/x-zip-compressed" }, { quoted: m })
    }
);

Sparky(
    {
        name: "mediafire",
        fromMe: isPublic,
        desc: "Instagram story downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
        if (!args) return await m.reply("_Enter Link_");
        var document = await fetch(`${API}/api/downloader/mediafire?url=${args}`);
        var zip = await document.json();
        client.sendMessage(m.jid, { document: { url: zip.data.link }, fileName: `${zip.data.name}`, mimetype: "application/zip" }, { quoted: m })
    }
);


Sparky(
    {
        name: "xvdl",
        fromMe: isPublic,
        desc: "Instagram story downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
        if (!args) return await m.reply("_Enter Link/Reply to a link_");
        m.reply("_Downloading..._")
        let xvdl = await fetch(`${API}/api/downloader/xdl?url=${args}`);
        var data = await xvdl.json();

        client.sendMessage(m.jid, { video: { url: data.data }, caption: "ðŸ¤¤ðŸ’¦" }, { quoted: m })
    }
);


Sparky({
    name: "play",
    fromMe: isPublic,
    desc: "Download and play your favorite audio or video directly from a link.",
    category: "downloader",
},
async ({
    m,
    client,
    args
}) => {
    try{
        args = args || m.quoted?.text;
if (!args) return await m.reply("_enter query or reply to link_");
let mes = await client.sendMessage(m.jid, { text : `Please wait, searching...` } , { quoted : m })
let sample = await fetch(`https://api.gifted.my.id/api/v1/yta?query=${args}`);
var data = await sample.json();
const songbuff = await (await fetch(`${data.data.downloadUrl}`)).buffer()
client.sendMessage(m.jid, { text : `_Downloading : ${data.data.title}_` , edit : mes.key })
await client.sendMessage(m.jid , {audio : songbuff,  mimetype : 'audio/mpeg'} , { quoted : m })
    } catch(e) {
        m.reply(e)
    }
    }
);

Sparky({
    name: "song",
    fromMe: isPublic,
    desc: "Download and play your favorite audio or video directly from a link.",
    category: "downloader",
},
async ({
    m,
    client,
    args
}) => {
    try{
        args = args || m.quoted?.text;
if (!args) return await m.reply("_enter query or reply to link_");
let mes = await client.sendMessage(m.jid, { text : `Please wait, searching...` } , { quoted : m })
let sample = await fetch(`https://viper.devstackx.in/api/v1/yta?query=${args}`);
var data = await sample.json();
const songbuff = await (await fetch(`${data.data.downloadUrl}`)).buffer()
client.sendMessage(m.jid, { text : `_Downloading : ${data.data.title}_` , edit : mes.key })
await client.sendMessage(m.jid , {audio : songbuff,  mimetype : 'audio/mpeg'} , { quoted : m })
    } catch(e) {
        m.reply(e)
    }
    }
);

// Sparky(
//     {
//         name: "ytv",
//         fromMe: isPublic,
//         category: "downloader",
//         desc: "",
//     },
//     async ({
//         m, client, args
//     }) => {
//         args = args || m.quoted?.text;
//         if (!args) return await m.reply("_Reply to a link_");
//         let ytdlmsg = await client.sendMessage(m.jid, { text: "_Please Wait...._" }, { quoted: m })
//         let data = await fetch(`${API}/api/downloader/ytv?url=${args}`);
//         var result = await data.json();
//         await client.sendMessage(m.jid, { text: result.data.title, edit: ytdlmsg.key })
//         client.sendMessage(m.jid, { video: { url: result.data.dlink }, caption: result.data.title }, { quoted: m })
//     }
// );
