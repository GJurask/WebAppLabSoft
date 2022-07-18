namespace WebApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class work_8 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SampleReason",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Identification = c.String(),
                        EditionDateTime = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.SampleClass", "EditionDateTime", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SampleClass", "EditionDateTime");
            DropTable("dbo.SampleReason");
        }
    }
}
