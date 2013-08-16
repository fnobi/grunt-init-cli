exports.description = 'grunt template for node.js cli application.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function (grunt, init, done) {
    init.process( {}, [
        init.prompt('name'),
        init.prompt('description'),
        {
            name: 'bin',
            message: 'bin name',
            default: require('path').basename(process.cwd()),
            validator: /^[a-zA-Z0-9_\-]+$/
        },
        init.prompt('author_name'),
        init.prompt('repository')
    ], function(err, props) {
        // add info
        props.template_name = 'cli';

        // Files to copy (and process).
        var files = init.filesToCopy(props);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props, {});

        // executable
        require('fs').chmodSync('bin/' + props.bin, '0755');

        // All done!
        done();
    });
};
