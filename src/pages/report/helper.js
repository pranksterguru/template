let allDetails = [];
let currentFilter = null;
let currentSearch = "";

function renderOverallMetrics(metrics) {
    if (!metrics) return '';
    let html = '<div class="mb-4"><div class="metrics-title-bar">Overall Metrics</div><div class="metrics-grid">';
    for (let metric in metrics) {
        const vals = metrics[metric];
        const total = (vals.Red || 0) + (vals.Amber || 0) + (vals.Green || 0);
        const redPct   = total ? ((vals.Red   || 0) / total) * 100 : 0;
        const amberPct = total ? ((vals.Amber || 0) / total) * 100 : 0;
        const greenPct = total ? ((vals.Green || 0) / total) * 100 : 0;

        html += `<div class="metric-group">
            <div class="metric-group-title">${metric.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</div>
            <div class="metric-bar">
                <div class="metric-bar-segment metric-bar-red" style="width:${redPct}%"></div>
                <div class="metric-bar-segment metric-bar-amber" style="width:${amberPct}%"></div>
                <div class="metric-bar-segment metric-bar-green" style="width:${greenPct}%"></div>
            </div>
            <div class="metric-count-row">
                <span class="metric-count-r">R:${vals.Red||0}</span>
                <span class="metric-count-a">A:${vals.Amber||0}</span>
                <span class="metric-count-g">G:${vals.Green||0}</span>
            </div>
        </div>`;
    }
    html += '</div></div>';
    return html;
}



function renderCardsElement(element) {
    const { columns, cards } = element;
    let html = '<div class="cards-container">';
    for (let i = 0; i < cards.length; i += columns) {
        html += `<div class="cards-row">`;
        for (let j = i; j < Math.min(i + columns, cards.length); j++) {
            let c = cards[j];
            html += `<div class="card-metric ${c.colour}">${c.name}<br>Score: ${c.score}</div>`;
        }
        html += `</div>`;
    }
    html += '</div>';
    return html;
}

function renderTextareaElement(element) {
    let html = '';
    for (let d of element.data) {
        html += `<div class="textarea-block"><div class="textarea-title">${d.title}</div>${d.content}</div>`;
    }
    return html;
}

function renderDetailsAccordion(details) {
    let html = '<div id="detailsAccordionRoot">';
    details.forEach((detail, i) => {
        let summary = `<span class="accordion-title">${detail.test_name}</span> 
            <span class="badge bg-${detail.overall_rating === "Red" ? "danger" : (detail.overall_rating === "Green" ? "success" : "warning text-dark")} ms-2">${detail.overall_rating}</span>`;
        html += `<h3>${summary}</h3><div>`;

        detail.elements.forEach(el => {
            if (el.type === "cards") {
                html += renderCardsElement(el);
            } else if (el.type === "textarea") {
                html += renderTextareaElement(el);
            }
        });

        html += `</div>`;
    });
    html += '</div>';
    return html;
}

function displayJsonData(json) {
    $('#overallMetrics').empty();
    $('#detailsAccordion').empty();

    let overall = json.result[0]?.overall?.metrics;
    allDetails = json.result[1]?.details || [];

    $('#overallMetrics').html(renderOverallMetrics(overall));
    $('#filterRow').show();
    currentFilter = null;
    currentSearch = "";
    $('#searchBox').val("");
    $('.filter-btn').removeClass('active');
    renderAndShowAccordion(allDetails);
}

function matchesSearch(detail, searchStr) {
    if (!searchStr) return true;
    searchStr = searchStr.toLowerCase();
    for (let el of (detail.elements || [])) {
        if (el.type === "textarea") {
            for (let d of el.data) {
                if ((d.title === "Input to AI" || d.title === "AI Generated") && d.content && d.content.toLowerCase().includes(searchStr)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function filterAndRenderAccordion(rating, searchStr) {
    let filtered = allDetails;
    if (rating) {
        filtered = filtered.filter(x => (x.overall_rating || '').toLowerCase() === rating.toLowerCase());
    }
    if (searchStr) {
        filtered = filtered.filter(x => matchesSearch(x, searchStr));
    }
    renderAndShowAccordion(filtered);
}

function renderAndShowAccordion(details) {
    $('#detailsAccordion').html(renderDetailsAccordion(details));
    $("#detailsAccordionRoot").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    });
}

$(function () {
    $('#jsonFile').on('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;
        $('#filePickerBlock').hide();

        const reader = new FileReader();
        reader.onload = function (evt) {
            try {
                const json = JSON.parse(evt.target.result);
                displayJsonData(json);
            } catch (err) {
                alert("Invalid JSON file.");
            }
        };
        reader.readAsText(file);
    });

    // Filter logic
    $(document).on('click', '.filter-btn', function () {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        currentFilter = $(this).data('filter');
        filterAndRenderAccordion(currentFilter, $('#searchBox').val());
    });
    $('#resetFilter').on('click', function () {
        $('.filter-btn').removeClass('active');
        $('#searchBox').val('');
        currentFilter = null;
        currentSearch = "";
        renderAndShowAccordion(allDetails);
    });
    $('#searchBox').on('input', function () {
        currentSearch = $(this).val();
        filterAndRenderAccordion(currentFilter, currentSearch);
    });
});
