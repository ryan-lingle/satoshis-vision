class RootController < ApplicationController
  def root

    @words = Oj.dump(get_words.as_json)
  end

  def get_words
    Word.all.order(id: :asc).map do |w|
      {
        id: w.id,
        text: w.text,
        edited: w.edited
      }
    end
  end
end
