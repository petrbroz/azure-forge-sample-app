const API_HOST = 'https://test-forge-project-app.azurewebsites.net';
const VIEWER_OPTIONS = {
	env: 'AutodeskProduction',
	getAccessToken: function(callback) {
		fetch(`${API_HOST}/api/auth/token`)
		    .then((response) => response.json())
		    .then((auth) => callback(auth.access_token, auth.expires_in))
            .catch(err => console.error(err));
	}
};

let app = null;

Autodesk.Viewing.Initializer(VIEWER_OPTIONS, () => {
	app = new Autodesk.Viewing.ViewingApplication('viewer');
    app.registerViewer(app.k3D, Autodesk.Viewing.Private.GuiViewer3D, { extensions: [] });

    // Populate models dropdown
    const select = document.getElementById('models');
    select.addEventListener('change', function(ev) {
        loadModel(ev.target.value);
    });
    fetch(`${API_HOST}/api/data/buckets`)
        .then(response => response.json())
        .then(buckets => {
            for (const bucket of buckets) {
                fetch(`${API_HOST}/api/data/buckets/${bucket}/models`)
                    .then(response => response.json())
                    .then(models => {
                        for (const model of models) {
                            const option = document.createElement('option');
                            option.innerText = bucket + '/' + model.name;
                            option.value = model.urn;
                            select.appendChild(option);
                        }
                        loadModel(select.value);
                    })
                    .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err));
});

function loadModel(urn) {
    return new Promise(function(resolve, reject) {
        function onDocumentLoadSuccess() {
            const viewables = app.bubble.search({ type: 'geometry' });
            if (viewables.length > 0) {
                app.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFailure);
            }
        }
        function onDocumentLoadFailure() { reject('could not load document'); }
        function onItemLoadSuccess() { resolve(); }
        function onItemLoadFailure() { reject('could not load model'); }
        app.loadDocument('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}
