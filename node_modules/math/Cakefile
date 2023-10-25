{exec, spawn} = require 'child_process'
path = require 'path'

repo = 'git' # or 'hg

getVersion = -> spawn 'npm', ['--version'], (err, stdout, stderr) ->
    [err, stdout, stderr]

task 'edit', 'Edit the Cakefile', (options) ->
    console.log 'Not implemented', options

task 'version', 'Display the package version.', (options) ->
    exec 'npm --version', (error, stdout, stderr) ->
        version = stdout.split('.')
        console.log version[2]

task 'ci', 'commit', (options) ->
    console.dir(options)
    exec "#{repo} commit", (error, stdout, stderr) ->
        console.log stdout

task 'co', 

task 'push'

task 'pull'

option '-m', '--message', 'Message'
