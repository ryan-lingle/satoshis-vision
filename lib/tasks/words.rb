namespace :words do
  task shorten: :environment do
    too_big = Words.all.select { |w| w.length > 17 }
    too_big.each do |w|
      w.text = w.text[0...17]
      w.save
    end
  end
end
