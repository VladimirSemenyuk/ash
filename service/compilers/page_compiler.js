var fs = require('fs-extra'),
    jade = require('jade'),
    _ = require('lodash');

module.exports = {
    compile: function() {
        for (var i = 0; i < ash.pages.length; i++) {
            var page = ash.pages[i];

            page._ash = ash;

            var data = JSON.parse(fs.readFileSync('data/config.json')),
                html = jade.renderFile('service/templates/main.jade', {
                    currentPage: page.name,
                    pretty: true,
                    title: data.siteTitle + ' &mdash; ' + page.name,
                    pages: ash.contentPages,
                    content: page.template()
                });

            fs.writeFileSync('output/' + page.id + '.html', html);
        }

        try {
            fs.mkdirSync('output/guitars');
        } catch(e) {

        }

        try {
            fs.mkdirSync('output/basses');
        } catch(e) {

        }

        for (var i = 0; i < ash.guitarModels.length; i++) {
            var model = ash.guitarModels[i];

            model._ash = ash;

            model.instruments = _.where(ash.instruments, {model: model.id});

            var data = JSON.parse(fs.readFileSync('data/config.json')),
                html = jade.renderFile('service/templates/main.jade', {
                    currentPage: model.name,
                    pretty: true,
                    title: data.siteTitle + ' &mdash; ' + model.name,
                    pages: ash.contentPages,
                    content: model.template()
                });

            fs.writeFileSync('output/guitars/' + model.id + '.html', html);
        }

        for (var i = 0; i < ash.bassModels.length; i++) {
            var model = ash.bassModels[i];

            model._ash = ash;

            model.instruments = _.where(ash.instruments, {model: model.id});

            var data = JSON.parse(fs.readFileSync('data/config.json')),
                html = jade.renderFile('service/templates/main.jade', {
                    currentPage: model.name,
                    pretty: true,
                    title: data.siteTitle + ' &mdash; ' + model.name,
                    pages: ash.contentPages,
                    content: model.template()
                });

            fs.writeFileSync('output/basses/' + model.id + '.html', html);
        }

        try {
            fs.mkdirSync('output/instruments');
        } catch(e) {

        }

        for (var i = 0; i < ash.instruments.length; i++) {
            var instrument = ash.instruments[i];

            instrument._ash = ash;

            instrument.model = _.findWhere(ash.models, {id: instrument.model});

            var data = JSON.parse(fs.readFileSync('data/config.json')),
                html = jade.renderFile('service/templates/main.jade', {
                    currentPage: instrument.name,
                    pretty: true,
                    title: data.siteTitle + ' &mdash; ' + instrument.model,
                    pages: ash.contentPages,
                    content: instrument.template()
                });

            fs.writeFileSync('output/instruments/' + instrument.id + '.html', html);
        }
    }
}