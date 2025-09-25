const axios = require('axios');

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        const { address, activationDate } = JSON.parse(event.body);
        
        console.log('Calculating score for:', address, 'activated on:', activationDate);
        
        // Здесь будет реальная логика с Basescan API
        // Пока используем mock данные с учетом даты активации
        const mockData = {
            totalScore: Math.floor(Math.random() * 100) + 450,
            rank: `Top ${Math.floor(Math.random() * 20) + 5}%`,
            metrics: {
                transactionCount: Math.floor(Math.random() * 500) + 50,
                totalVolume: (Math.random() * 10).toFixed(2),
                activeDays: Math.floor(Math.random() * 90) + 10,
                uniqueContracts: Math.floor(Math.random() * 100) + 5
            },
            timeline: generateMockTimeline()
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(mockData)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};

function generateMockTimeline() {
    const timeline = [];
    for (let i = 90; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        timeline.push({
            date: date.toISOString().split('T')[0],
            transactions: Math.floor(Math.random() * 10)
        });
    }
    return timeline;
}
