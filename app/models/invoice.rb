class Invoice < ApplicationRecord
  serialize :edits, Array
end
