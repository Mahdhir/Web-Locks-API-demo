const locksDiv = document.getElementById("currentLocks");
const resource1Value = document.getElementById("resource_1_value");
const resource2Value = document.getElementById("resource_2_value");

function sample() {
    console.log("sample task");
}

const delay = (delayInms) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

const requestForResource1 = async () => {
    if (!navigator.locks) {
        alert("Your browser does not support Web Locks API");
        return;
    }

    await navigator.locks.request('resource_1', async lock => {
        // The lock has been acquired.
		const resource1 = localStorage.getItem('resource1') | 0;
		resource1Value.innerText = resource1;
        await showCurrentLocks();
        await delay(10000);
		localStorage.setItem('resource1', +resource1 + 1);
		resource1Value.innerText = +resource1 + 1;
        console.log("delay over");
        // Now the lock will be released.
    });
    await showCurrentLocks();

}

const requestForResource2 = async () => {
    if (!navigator.locks) {
        alert("Your browser does not support Web Locks API");
        return;
    }
    await navigator.locks.request('resource_2', async lock => {
        // The lock has been acquired.
		const resource2 = localStorage.getItem('resource2') | 0;
		resource2Value.innerText = resource2;
        await showCurrentLocks();
        await delay(10000);
		localStorage.setItem('resource2', +resource2 + 1);
		resource1Value.innerText = +resource2 + 1;
        console.log("delay over");
        // Now the lock will be released.
    });
    await showCurrentLocks();


}

const showCurrentLocks = async () => {
    if (!navigator.locks) {
        alert("Your browser does not support Web Locks API");
        return;
    }
    const query = await navigator.locks.query();
    console.log(query);
    locksDiv.innerHTML = JSON.stringify(query, null, '<br>');
}

const clearData = () => {
	console.log("Cleared");
	localStorage.clear();
	resource1Value.innerText = '0';
	resource2Value.innerText = '0';
}