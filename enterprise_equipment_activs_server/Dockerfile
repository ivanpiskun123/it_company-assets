FROM ruby:2.7.3

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client yarn
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
