class Api::V1::LndController < ApplicationController
  protect_from_forgery with: :null_session

  def invoice
    edits = JSON.parse(params[:edits])

    value = edits.size * 100

    invoice_request = Lnrpc::Invoice.new({ memo: "Editing the Vision", value: value, expiry: 300 })
    invoice = LnService.grpc_client.add_invoice(invoice_request)

    InvoicesWorker.perform_async(
      payment_request: invoice.payment_request,
      edits: edits
    )
    render json: { 'invoice': invoice.payment_request }.as_json
  end
end
