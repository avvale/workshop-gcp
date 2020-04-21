const dsClient = require('../server/gcp/datastore');

const naturalText = [
    {
        date: 'gcp',
        text: 'Nigel',
        data: 'Which company runs GCP?'
    },
    {
        date: 'gcp',
        text: 'Nigel',
        data: 'Which company runs GCP?'
    },
    {
        date: 'gcp',
        text: 'Nigel',
        data: 'Which company runs GCP?'
    },
    {
        date: 'gcp',
        text: 'Nigel',
        data: 'Which company runs GCP?'
    }
];

naturalText.forEach(item => {
    dsClient.create('natural_text', item);
});

const recognitionImage = [
    {
        date: 'gcp',
        image: 'Nigel',
        data: 'Which company runs GCP?'
    },
    {
        date: 'gcp',
        image: 'Nigel',
        data: 'Which company runs GCP?'
    },
    {
        date: 'gcp',
        image: 'Nigel',
        data: 'Which company runs GCP?'
    },
    {
        date: 'gcp',
        image: 'Nigel',
        data: 'Which company runs GCP?'
    }
];

recognitionImage.forEach(item => {
    dsClient.create('recognition_image', item);
});