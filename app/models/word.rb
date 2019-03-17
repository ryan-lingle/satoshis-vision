class Word < ApplicationRecord
  WHITELISTED_CHARACTERS = %w(q w e r t y u i o p a s d f g h j k l z x c v b n m , . ; ? ! - 1 2 3 4 5 6 7 8 9 0 # $ % * + = > < : ' [ ]).freeze
  validate :validate_text
  def self.to_array
    self.all.map do |word|
      word.text
    end
  end

  def self.push_edits(edits)
    edits.each do |edit|
      word = self.find(edit["id"])
      word.text = edit["text"]
      word.save
    end
  end

  def validate_text
    unless text != '' && check(text)
      errors.add(:text, 'invalid')
    end
  end

  def check(text)
    text.split('').all? { |l| WHITELISTED_CHARACTERS.include?(l.downcase) }
  end
end