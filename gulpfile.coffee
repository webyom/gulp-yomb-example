_ = require 'lodash'
through = require 'through2'
gulp = require 'gulp'
karma = require 'gulp-karma'
less = require 'gulp-less'
sass = require 'gulp-sass'
concat = require 'gulp-concat'
amdBundler = require 'gulp-amd-bundler'
htmlI18n = require 'gulp-html-i18n'
htmlOptimizer = require 'gulp-html-optimizer'
propertyMerge = require 'gulp-property-merge'
trace = require 'gulp-trace'
minify = require 'gulp-minifier'
backtrace = require 'gulp-backtrace'
argv = require('minimist') process.argv.slice(2)

BUILD_TARGET = process.env.BUILD_TARGET || 'default'
DEST_BASES = 
	default: 'dist'
	prototype: 'prototype'

destBase = DEST_BASES[BUILD_TARGET] || DEST_BASES.default
properties = require "./properties.#{BUILD_TARGET}"

if argv.properties
	_.extend properties, JSON.parse(argv.properties)

minifyDefault = ->
	minify
		minify: argv.minify
		collapseWhitespace: true
		conservativeCollapse: true
		removeComments: true
		minifyJS: true
		minifyCSS: true

gulp.task 'less', ->
	gulp.src(['src/**/main.less', 'src/**/*-main.less'])
		.pipe less()
		.pipe minifyDefault()
		.pipe gulp.dest(destBase)

gulp.task 'sass', ->
	gulp.src(['src/**/main.scss', 'src/**/*-main.scss'])
		.pipe sass()
		.pipe minifyDefault()
		.pipe gulp.dest(destBase)

gulp.task 'copy', ->
	gulp.src('src/lib/yom-require/**/*.js')
		.pipe minifyDefault()
		.pipe gulp.dest(destBase + '/lib/yom-require')
	gulp.src('src/lang/**/*.js')
		.pipe minifyDefault()
		.pipe gulp.dest(destBase + '/lang')
	gulp.src('src/**/*.+(jpg|jpeg|gif|png|otf|eot|svg|ttf|woff|ico)')
		.pipe gulp.dest(destBase)
	if BUILD_TARGET is 'prototype'
		gulp.src('src/mockup-data/**/*.json')
			.pipe gulp.dest(destBase + '/mockup-data')

gulp.task 'concat', ->
	gulp.src([
			'src/lib/jquery/jquery-1.9.1.js'
		])
		.pipe trace()
		.pipe concat('jquery-1.9.1.js')
		.pipe minifyDefault()
		.pipe gulp.dest(destBase + '/lib/jquery')

gulp.task 'amd-bundle', ->
	gulp.src([
			'src/**/main.js'
			'src/**/*-main.js'
			'src/**/main.coffee'
			'src/**/*-main.coffee'
			'src/**/main.tpl.html'
			'src/**/*-main.tpl.html'
		]).pipe amdBundler
			beautifyTemplate: true
			trace: true
		.pipe propertyMerge
			properties: properties
		.pipe minifyDefault()
		.pipe gulp.dest(destBase)

gulp.task 'html-optimize', ->
	gulp.src(['src/**/*.src.html'])
		.pipe htmlI18n
			langDir: 'src/lang'
			trace: true
		.pipe htmlOptimizer
			requireBaseDir: 'src'
			beautifyTemplate: true
			trace: true
		.pipe htmlI18n
			langDir: 'src/lang'
		.pipe propertyMerge
			properties: properties
		.pipe minifyDefault()
		.pipe gulp.dest(destBase)

gulp.task 'test', ->
	stream = through.obj()
	karmaStream = stream.pipe karma
			configFile: 'karma.conf.js'
			port: 9877
			singleRun: true
			browsers: ['PhantomJS']
		.on 'error', (err) ->
			throw err
	stream.end()
	karmaStream

gulp.task 'fix-less-trace', ->
	path = require 'path'
	gulp.src('src/**/*.less')
		.pipe through.obj (file, enc, next) ->
			content = file.contents.toString().replace(/^\/\*\s*trace:[^*]+\*\/(\r\n|\n)*/, '')
			trace = '/* trace:' + path.relative(file.cwd, file.path) + ' */'
			file.contents = new Buffer trace + '\n' + content
			@push file
			next()
		.pipe gulp.dest('src')

gulp.task 'fix-sass-trace', ->
	path = require 'path'
	gulp.src('src/**/*.scss')
		.pipe through.obj (file, enc, next) ->
			content = file.contents.toString().replace(/^\/\*\s*trace:[^*]+\*\/(\r\n|\n)*/, '')
			trace = '/* trace:' + path.relative(file.cwd, file.path) + ' */'
			file.contents = new Buffer trace + '\n' + content
			@push file
			next()
		.pipe gulp.dest('src')

gulp.task 'release', ->
	path = require 'path'
	rimraf = require 'rimraf'
	destStream = gulp.dest 'release'
	files = []
	rimraf 'release', (err) ->
		throw err if err
		if argv.f
			files = argv.f.split ' '
			gulp.src(files)
				.pipe backtrace
					log: true
					targetDir: destBase
				.pipe minifyDefault()
				.pipe destStream
		else
			throw new Error 'Please specify -f'
	destStream

gulp.task 'build', ['copy', 'less', 'sass', 'concat', 'amd-bundle', 'html-optimize']
gulp.task 'default', ['build']
