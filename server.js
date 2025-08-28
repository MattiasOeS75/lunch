const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Restaurant data from your CSV
const restaurants = [
     {name: "Brisket and friends", note: "Lunch endast på FREDAGAR!", url: "https://www.google.com/maps/place/Brisket+and+friends/data=!4m2!3m1!1s0x465f9d58b91c3913:0x6cdaf3a25244983e"},
            {name: "M.O.A.S", note: "", url: "https://maps.app.goo.gl/keXggDrrNFBaG29Z8"},
            {name: "Totemo Ramen", note: "", url: "https://www.google.com/maps/place/Totemo+Ramen/data=!4m2!3m1!1s0x465f9d7bc299384b:0xb832d1c1a7c10ec3"},
            {name: "Between buns", note: "", url: "https://www.google.com/maps/place/Between+buns/data=!4m2!3m1!1s0x465f7c807aa8647b:0x248807eab1279689"},
            {name: "Waan Thai", note: "", url: "https://www.google.com/maps/place/Waan+Thai/data=!4m2!3m1!1s0x465f9d7a107403d5:0xfec35f5bc310e0b3"},
            {name: "Spice of India", note: "", url: "https://www.google.com/maps/place/Spice+of+India/data=!4m2!3m1!1s0x465f9d7b0979db4f:0x664d56228de8897"},
            {name: "Tavolino", note: "", url: "https://www.google.com/maps/place/Tavolino/data=!4m2!3m1!1s0x465f9d79069bb237:0x81faad726c9375ee"},
            {name: "DalaNisse", note: "", url: "https://www.google.com/maps/place/DalaNisse/data=!4m2!3m1!1s0x465f9d79a5db3dc1:0x4939c08addb2a62d"},
            {name: "Günter's", note: "", url: "https://www.google.com/maps/place/G%C3%BCnter's/data=!4m2!3m1!1s0x465f9d78334caa17:0xb7679486fe5e4013"},
            {name: "Raw Sushi & Grill", note: "", url: "https://www.google.com/maps/place/Raw+Sushi+%26+Grill/data=!4m2!3m1!1s0x465f9d7970de7af3:0x5825c7deb722ccf5"},
            {name: "Rawbata", note: "", url: "https://www.google.com/maps/place/Rawbata/data=!4m2!3m1!1s0x465f9d79094d6dbd:0xf97e1b6ace87006d"},
            {name: "Levinskys Burger", note: "", url: "https://www.google.com/maps/place/Levinskys+Burger/data=!4m2!3m1!1s0x465f9d797120cbb5:0x9d2f09af88115913"},
            {name: "Rörstrands Grillen", note: "", url: "https://www.google.com/maps/place/R%C3%B6rstrands+Grillen/data=!4m2!3m1!1s0x465f9d797c6d48a3:0xddf209c6fe318126"},
            {name: "Tehran Grill", note: "", url: "https://www.google.com/maps/place/Tehran+Grill/data=!4m2!3m1!1s0x465f9d79b4b16bbd:0xc34bd2d2289ed2f0"},
            {name: "Portal Restaurant & Bar", note: "", url: "https://www.google.com/maps/place/Portal+Restaurant+%26+Bar/data=!4m2!3m1!1s0x465f9d7bafe95555:0x6026f4a9bcfeacfa"},
            {name: "Il Forno", note: "", url: "https://www.google.com/maps/place/Il+Forno/data=!4m2!3m1!1s0x465f9d7bbd5aa25f:0xb970d94c68e73179"},
            {name: "itamae izakaya", note: "", url: "https://www.google.com/maps/place/itamae+izakaya/data=!4m2!3m1!1s0x465f9d7a4ee8d6fd:0xb18980d976b8af84"},
            {name: "Shanti Touch of Bengal", note: "", url: "https://www.google.com/maps/place/Shanti+Touch+of+Bengal/data=!4m2!3m1!1s0x465f9d7901ed962f:0x4c69ddb54d28ba27"},
            {name: "Snö", note: "", url: "https://www.google.com/maps/place/Sn%C3%B6/data=!4m2!3m1!1s0x465f9d7a8b1a0559:0x3f4cda41e55f2ae"},
            {name: "THE ITALIAN COUSINS - Pizza al Taglio", note: "", url: "https://www.google.com/maps/place/THE+ITALIAN+COUSINS+-+Pizza+al+Taglio/data=!4m2!3m1!1s0x465f9d7aa1b1b1ad:0x51b28d3af98aec2b"},
            {name: "Sushi Kayya", note: "", url: "https://www.google.com/maps/place/Sushi+Kayya/data=!4m2!3m1!1s0x465f9d48da08333f:0xb7ebc3add044d7e6"},
            {name: "China Kungsholmen", note: "", url: "https://www.google.com/maps/place/China+Kungsholmen/data=!4m2!3m1!1s0x465f9d7a96a9e07f:0x398e360d5da2fb7c"},
            {name: "Birkastans Pizzeria", note: "", url: "https://www.google.com/maps/place/Birkastans+Pizzeria/data=!4m2!3m1!1s0x465f9d79a41b37e5:0xdae79bbefeb269df"},
            {name: "Daily's Bistro", note: "", url: "https://www.google.com/maps/place/Daily%E2%80%99s+Bistro/data=!4m2!3m1!1s0x465f9d7a324311fd:0xc32b83912de7638f"},
            {name: "Bröd & Salt Sankt Eriksplan", note: "", url: "https://www.google.com/maps/place/Br%C3%B6d+%26+Salt+Sankt+Eriksplan/data=!4m2!3m1!1s0x465f9d536ab75bbd:0xbae8e41735435689"},
            {name: "Eatnam", note: "", url: "https://www.google.com/maps/place/Eatnam/data=!4m2!3m1!1s0x465f9d6ffdeeaf6d:0xc562e32ab1a7f9c"},
            {name: "Restaurang Kinamuren", note: "", url: "https://www.google.com/maps/place/Restaurang+Kinamuren/data=!4m2!3m1!1s0x465f9d7004640a6b:0x200d7e2243b64bb0"},
            {name: "Le Kebab Odenplan", note: "", url: "https://www.google.com/maps/place/Le+Kebab+Odenplan/data=!4m2!3m1!1s0x465f9d09ff8b0b59:0x69010d9b07956f0d"},
            {name: "Indian Street Food & Co", note: "", url: "https://www.google.com/maps/place/Indian+Street+Food+%26+Co/data=!4m2!3m1!1s0x465f9dbcac2842b9:0x4e5dcd1a36dd4234"},
            {name: "Kanto Bistro", note: "", url: "https://maps.app.goo.gl/Nq8ZpXMsSj2NGZhu6"},
            {name: "Tajrish", note: "Persiskt", url: "https://maps.app.goo.gl/uhK4tQfCR5YWN9Vf8"},
            {name: "The Border", note: "", url: "https://maps.app.goo.gl/JTJuUFjMiUUL5i7d7"},
            {name: "ESA Sushi", note: "", url: "https://maps.app.goo.gl/wv2Syh9PhsCk1ZCVA"},
            {name: "Hasselsson", note: "", url: "https://maps.app.goo.gl/UJ1pAyJdxCtHdsX3A"},
            {name: "Chatong Thai Nudelbar", note: "", url: "https://maps.app.goo.gl/djKMyKVBTM9C9GDEA"},
             {name: "L'Incontro Pasta", note: "", url: "https://maps.app.goo.gl/YZZVRPt6e8tbrncn7"},
            {name: "Take ramen", note: "", url: "https://www.google.com/maps/place/Take+ramen/data=!4m2!3m1!1s0x465f9d2d844fb25b:0xe6fa9330d392571e"}

];

// Helper function to get random restaurant
function getRandomRestaurant(filter = null) {
    let filteredRestaurants = restaurants;
    
    if (filter) {
        filteredRestaurants = restaurants.filter(r => 
            r.cuisine.includes(filter.toLowerCase()) || 
            r.name.toLowerCase().includes(filter.toLowerCase())
        );
    }
    
    if (filteredRestaurants.length === 0) {
        filteredRestaurants = restaurants; // Fallback to all restaurants
    }
    
    return filteredRestaurants[Math.floor(Math.random() * filteredRestaurants.length)];
}

// Helper function to format Slack response
function formatSlackResponse(restaurant, isPublic = false) {
    const noteText = restaurant.note ? `\n_${restaurant.note}_` : '';
    
    return {
        response_type: isPublic ? "in_channel" : "ephemeral",
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `🍽️ *${restaurant.name}*${noteText}`
                }
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "📍 View on Maps"
                        },
                        url: restaurant.url,
                        action_id: "view_map"
                    }
                ]
            }
        ]
    };
}

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: '🍽️ Crosby Lunch Roulette API',
        status: 'running',
        endpoints: {
            health: '/health',
            restaurants: '/restaurants',
            slack_command: '/slack/lunch',
            slack_interactive: '/slack/interactive'
        },
        restaurants: restaurants.length
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        restaurants: restaurants.length,
        timestamp: new Date().toISOString()
    });
});

// Get all restaurants (for debugging)
app.get('/restaurants', (req, res) => {
    res.json({
        total: restaurants.length,
        cuisines: [...new Set(restaurants.map(r => r.cuisine))].sort(),
        restaurants: restaurants
    });
});

// Main slash command endpoint - PRIVATE lunch suggestions
app.post('/slack/lunch', (req, res) => {
    const { text, user_name } = req.body;
    
    console.log(`Private lunch request from ${user_name}: "${text}"`);
    
    // Parse command arguments
    const filter = text ? text.trim().toLowerCase() : null;
    
    // Handle help command
    if (text === 'help') {
        return res.json({
            response_type: "ephemeral",
            text: "🍽️ *Crosby Lunch Roulette Help*",
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "*Available commands:*\n• `/lunch` - Random restaurant (private)\n• `/lunch japanese` - Filter by cuisine (private)\n• `/luncha` - Random restaurant (shared with channel)\n• `/luncha italian` - Filter + share with channel\n• `/lunch help` - Show this help"
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "*Available cuisines:*\n`italian`, `japanese`, `chinese`, `indian`, `thai`, `burgers`, `american`, `swedish`, `middle-eastern`, `persian`, `vietnamese`, `healthy`, `kebab`"
                    }
                }
            ]
        });
    }
    
    // Get random restaurant (always private)
    const restaurant = getRandomRestaurant(filter);
    const response = formatSlackResponse(restaurant, false);
    
    // Add filter info if used
    if (filter && filter !== 'help') {
        response.blocks.unshift({
            type: "context",
            elements: [
                {
                    type: "mrkdwn",
                    text: `Filtered by: *${filter}*`
                }
            ]
        });
    }
    
    res.json(response);
});

// Public lunch command endpoint - SHARE with channel
app.post('/slack/luncha', (req, res) => {
    const { text, user_name } = req.body;
    
    console.log(`PUBLIC lunch request from ${user_name}: "${text}"`);
    
    // Parse command arguments
    const filter = text ? text.trim().toLowerCase() : null;
    
    // Handle help command
    if (text === 'help') {
        return res.json({
            response_type: "ephemeral",
            text: "🍽️ *Luncha Command Help*",
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "The `/luncha` command shares lunch suggestions with the entire channel!\n\n*Examples:*\n• `/luncha` - Random restaurant for everyone\n• `/luncha japanese` - Japanese restaurants for the team\n• `/luncha burgers` - Burger places shared publicly"
                    }
                }
            ]
        });
    }
    
    // Get random restaurant (always public)
    const restaurant = getRandomRestaurant(filter);
    const response = formatSlackResponse(restaurant, true);
    
    // Add filter info if used
    if (filter && filter !== 'help') {
        response.blocks.unshift({
            type: "context",
            elements: [
                {
                    type: "mrkdwn",
                    text: `${user_name} filtered by: *${filter}*`
                }
            ]
        });
    } else if (!filter) {
        response.blocks.unshift({
            type: "context",
            elements: [
                {
                    type: "mrkdwn",
                    text: `${user_name} spun the lunch roulette! 🎰`
                }
            ]
        });
    }
    
    res.json(response);
});

// Simple interactive handler - just acknowledge maps button clicks
app.post('/slack/interactive', (req, res) => {
    console.log('Maps button clicked');
    res.status(200).send('');
});

app.listen(port, () => {
    console.log(`🍽️ Crosby Lunch Roulette API running on port ${port}`);
    console.log(`📍 Private lunch: /slack/lunch`);
    console.log(`📢 Public lunch: /slack/luncha`);
    console.log(`🏥 Health check: /health`);
});

module.exports = app;
