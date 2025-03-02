import { Text, View } from "react-native";
import { useState, useEffect } from 'react';


const url = "https://api.groq.com/openai/v1/chat/completions";
const apiKey = "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";

async function makePlaylist(keywords, setPlaylist) {
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
              {
                  role: "user",
                  content: `Give me 5 songs that satisfy the following keywords: ${keywords.join(", ")}. Comma separate their names without additional explanation. End response with \"Done.\"`
              }
          ]
      })
  });
  
  const data = await response.json();
  let r = data.choices[0].message.content;
  r = r.substring(0, r.indexOf("Done.")).trim();
  if (r.endsWith(",")) r = r.slice(0, -1);
  
  setPlaylist(r.split(", "));
}


export default function Index() {
    const keywords = ["Happy", "Taylor", "Swift"]
    const [playlist, setPlaylist] = useState([]);
    
    useEffect(() => {
      makePlaylist(keywords, setPlaylist);
    }, []);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Playlist: <ul>{playlist.map(p=> <li>{p}</li>)}</ul></Text>
        
      </View>
    );
  }
  