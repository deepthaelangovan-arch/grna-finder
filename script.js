function findGRNA() {
    let dna = document.getElementById("dna").value
        .toUpperCase()
        .replace(/\s/g, "");

    let results = document.getElementById("results");

    // Validate DNA sequence
    if (!dna) {
        results.innerHTML = "<p>Please enter a DNA sequence.</p>";
        return;
    }

    if (!/^[ATGC]+$/.test(dna)) {
        results.innerHTML =
            "<p>Invalid DNA sequence. Use only A, T, G and C.</p>";
        return;
    }

    let found = false;
    let output = "<h3>PAM Sites Found:</h3>";

    // Scan for SpCas9 PAM: NGG
    for (let i = 0; i < dna.length - 2; i++) {

        let pam = dna.substring(i, i + 3);

        if (pam[1] === "G" && pam[2] === "G") {
            found = true;

            let start = Math.max(0, i - 20);
            let guide = dna.substring(start, i);

            output += `
                <p>
                <b>PAM:</b> ${pam}<br>
                <b>Position:</b> ${i + 1}<br>
                <b>Candidate target sequence:</b> ${guide}
                </p>
                <hr>
            `;
        }
    }

    if (!found) {
        output += "<p>No NGG PAM sites were found.</p>";
    }

    results.innerHTML = output;
}
